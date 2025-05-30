import os
from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
import json
import time
from fastapi import HTTPException

class ChatGPTService:
    def __init__(self, system_prompt_template: str, user_prompt_template: str):
        """Initialize the ChatGPTService with OpenAI client and environment variables."""
        load_dotenv()

        self.client = OpenAI(
            api_key=os.getenv("GROQ_API_KEY"),
            base_url="https://api.groq.com/openai/v1",
        )

        self.system_prompt_template = self._load_prompt_template(system_prompt_template) 
        self.user_prompt_template = self._load_prompt_template(user_prompt_template)

    def ask_llm(self, prompt_vars: dict, temperature, top_p) -> str:
        """Send a prompt to the LLM and return the response as a string."""
        messages = self._prepare_prompts(prompt_vars)

        response = self.client.chat.completions.create(
            model="llama3-70b-8192",
            messages=messages,
            temperature=temperature,
            top_p=top_p
        )

        content = response.choices[0].message.content
        return content.strip() if content is not None else ""
    
    async def ask_llm_async(self, prompt_vars: dict, temperature, top_p) -> str:
        return self.ask_llm(prompt_vars, temperature, top_p)

    def _prepare_prompts(self, prompt_vars):
        user_prompt = self.user_prompt_template

        for line in prompt_vars.get("user", []):
            user_var = line.get("value")
            user_prompt = user_prompt.replace(f"{{{line.get('name')}}}", user_var)

        messages = [
            {"role": "user", "content": user_prompt}
        ]

        system_prompt = self.system_prompt_template

        for line in prompt_vars.get("system", []):
            system_var = line.get("value")
            system_prompt = system_prompt.replace(f"{{{line.get('name')}}}", system_var)

        if system_prompt:
            messages.insert(0, {"role": "system", "content": system_prompt})
        return messages

    def _load_prompt_template(self, filename: str) -> str:
        """Load prompt template from the prompts folder."""
        prompt_path = Path(__file__).parent.parent / "prompts" / filename
        with open(prompt_path, "r", encoding="utf-8") as f:
            return f.read()