import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",  # важный параметр!
)

def ask_chatgpt(question: str) -> str:
    response = client.chat.completions.create(
        model="llama3-70b-8192",  # можно также "llama3-8b-8192"
        messages=[
            {"role": "user", "content": question}
        ]
    )
    return response.choices[0].message.content.strip()