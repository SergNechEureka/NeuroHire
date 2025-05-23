import os
from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path

import json

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)

def ask_chatgpt(question: str, prompt_sys: str) -> str:
    """Send a prompt to the LLM and return the response as a string."""
    messages=[
            {"role": "user", "content": question}
        ]
    
    if prompt_sys:
        messages.insert(0, {"role": "system", "content": prompt_sys})

    response = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=messages,  
        temperature=0.0
    )
    
    return response.choices[0].message.content.strip()

def load_prompt(filename: str) -> str:
    """Load prompt template from the prompts folder."""
    prompt_path = Path(__file__).parent.parent / "prompts" / filename
    with open(prompt_path, "r", encoding="utf-8") as f:
        return f.read()

def extract_metadata_from_cv(cv_text: str, max_retries=2) -> dict:
    """
    Extracts candidate metadata from the given CV text using an LLM prompt.
    Returns parsed JSON as a dictionary.
    """
    prompt_template = load_prompt("extract_metadata.txt")
    prompt = prompt_template.replace("{cv_text}", cv_text)

    for attempt in range(1, max_retries + 1):
        result = ask_chatgpt(prompt)

    # Parse only the JSON part from LLM response
        json_start = result.find('{')
        json_end = result.rfind('}') + 1

        try:
            result_str = json.loads(result[json_start:json_end])
        except Exception as e:
            print("LLM response (JSON parsing error):", result)
            raise e

        if result_str.get("candidate_name"):
            return result_str
    
        if attempt == max_retries:
            raise HTTPException(status_code=500, detail="Candidate name not found after multiple LLM attempts")
    
        time.sleep(1)

def extract_data_from_cv(max_retries, prompt_sys, prompt):
    for attempt in range(1, max_retries + 1):
        result = ask_chatgpt(prompt, prompt_sys)

    # Parse only the JSON part from LLM response
        json_start = result.find('[')
        json_end = result.rfind(']') + 1

        try:
            data = json.loads(result[json_start:json_end])

            if len(data) != 0:
                return data
            
        except Exception as e:
            print("LLM response (JSON parsing error):", result)
            raise e
        
        if attempt == max_retries:
            raise HTTPException(status_code=500, detail="Experience not found after multiple LLM attempts")

        time.sleep(1)

def extract_experience_from_cv(cv_text: str, max_retries=2) -> dict:
    prompt_template = load_prompt("extract_experience.txt")
    prompt_sys = load_prompt("extract_experience_sys.txt")
    prompt = prompt_template.replace("{cv_text}", cv_text)

    return extract_data_from_cv(max_retries, prompt_sys, prompt)

def extract_skill_from_cv(cv_text: str, max_retries=2) -> dict:
    prompt_template = load_prompt("extract_skill.txt")
    prompt_sys = load_prompt("extract_skill_sys.txt")
    prompt = prompt_template.replace("{cv_text}", cv_text)

    return extract_data_from_cv(max_retries, prompt_sys, prompt)

    

    
        