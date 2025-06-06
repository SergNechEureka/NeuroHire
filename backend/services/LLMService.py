import os
import openai
import groq
import together
import huggingface_hub
from huggingface_hub import InferenceClient
from abc import ABC, abstractmethod
from openai import OpenAI, RateLimitError
from dotenv import load_dotenv
from pathlib import Path

class LLMService(ABC):
    client: object

    def __init__(self, system_prompt_template: str, user_prompt_template: str) -> None:
        load_dotenv()

        if system_prompt_template:
            self.system_prompt_template = self._load_prompt_template(system_prompt_template) 
        if user_prompt_template:
            self.user_prompt_template = self._load_prompt_template(user_prompt_template)

        pass

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

    def ask_llm(self, prompt_vars: dict, model, temperature, top_p) -> str:
        """Send a prompt to the LLM and return the response as a string."""
        messages = self._prepare_prompts(prompt_vars)

        try:
            response = self.client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=temperature,
                top_p=top_p
            )

            content = response.choices[0].message.content
            return content.strip() if content is not None else ""
        
        except RateLimitError as e:
            return "repeat"
        
    async def ask_llm_async(self, prompt_vars: dict, model, temperature, top_p) -> str:
        return self.ask_llm(prompt_vars, model, temperature, top_p)

class GROQService(LLMService):
    def __init__(self, system_prompt_template: str, user_prompt_template: str):
        super().__init__(system_prompt_template, user_prompt_template)

        self.client = groq.Groq(api_key=os.getenv("GROQ_API_KEY"))

class thogetherAIService(LLMService):
    def __init__(self, system_prompt_template: str, user_prompt_template: str):
        super().__init__(system_prompt_template, user_prompt_template)

        self.client = together.Client(api_key=os.getenv("TOGETHER_API_KEY"))

class OpenAIService(LLMService):
    def __init__(self, system_prompt_template: str, user_prompt_template: str):
        super().__init__(system_prompt_template, user_prompt_template)

        self.client = openai.Client(api_key=os.getenv("OPENAI_API_KEY"))

class huggingFaceService(LLMService):
    def __init__(self, system_prompt_template: str, user_prompt_template: str):
        super().__init__(system_prompt_template, user_prompt_template)

        self.client = InferenceClient(api_key=os.getenv("HUGGING_FACE_API_KEY"))

    def ask_llm(self, prompt_vars: dict, model, temperature, top_p) -> str:
        cv_text = next(
            (item["value"] for item in prompt_vars["user"] if item["name"] == "cv_text"), None
        )

        src_text = "Translate to English: "+ cv_text

        src_lang = next(
            (item["value"] for item in prompt_vars["user"] if item["name"] == "language"), None
        )

        try:
            response = self.client.translation(
                model=model,
                #src_lang=src_lang,
                #tgt_lang="en",
                text=src_text
            )

            content = response.choices[0].message.content
            return content.strip() if content is not None else ""
        
        except RateLimitError as e:
            return "repeat"


    