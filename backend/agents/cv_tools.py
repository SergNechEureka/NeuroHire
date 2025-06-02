import pdfplumber
import pypandoc
import re
import json
import time
import asyncio
import uuid

from abc import ABC, abstractmethod
from typing import Any, Dict

from ..services.file_utils import TempFile  
from ..vector_db.utils import Embedder
from ..services.LLMService import LLMService, GROQService,thogetherAIService, huggingFaceService
from ..vector_db.VectorDBService import VectorDBService
from ..CandidatesDB.CVRepository import CVRepository
from ..CandidatesDB.CandidatesRepository import CandidatesRepository
from ..CandidatesDB.models import CVMeta, CVExperience, CVSkill, Candidate
from ..db import get_session
from ..services.langdetectSingleton import LangDetectSingleton


class BaseTool(ABC):
    name: str = ""
    description: str = ""
    input_schema: Dict[str, str] = {}
    output_schema: Dict[str, str] = {}
    llm_service: LLMService
    file: TempFile
    max_retries: int = 3


    @abstractmethod
    def run(self, *args, **kwargs) -> Any:

        pass

    def _conver_llm_answer_to_json(self, answer: str) -> dict:
        # Parse only the JSON part from LLM response
        json_start = answer.find('[')
        if json_start == -1 or answer.find('{') < json_start:
            json_start = answer.find('{')
            json_end = answer.rfind('}') + 1
        else:
            json_end = answer.rfind(']') + 1

        try:
            json_answer = json.loads(answer[json_start:json_end])

            if len(json_answer) != 0:
                return json_answer
            else:
                return {}
            
        except Exception as e:
            print("LLM response (JSON parsing error):", answer)
            
            raise

class ParseCVTool(BaseTool):
    name = "ParseCVTool"
    description = "Check if the given text is a CV or resume."
    input_schema = {"cv_text": "str"}
    output_schema = {"result": "bool (either 'True' or 'False')"}

    def _clean_symbols(self, text: str) -> str:
        text = text[2:] if text.startswith("> ") else text
        text = re.sub(r'\|\s+\|', '', text)   
        text = text.replace('|', '')    
        text = text.replace('<!---->', '')   
        text = text.replace('**>**', '')      
        text = text.replace('**', '')        
        text = text.replace('>>', '')        
        text = text.replace('> >', '')    
        text = re.sub(r' {2,}', ' ', text)    
        text = re.sub(r'^\s+', '', text, flags=re.MULTILINE)   
        text = re.sub(r'\s+$', '', text, flags=re.MULTILINE)   
        text = text.replace('<!-- -->', '')
        text = text.replace('{.underline}', '')
        return text
    
    def _clean_pandoc_table(self, text: str) -> str:
        lines = text.splitlines()
        cleaned = []
        for line in lines:
            if not re.search(r'\w', line):
                continue

            cleaned.append(self._clean_symbols(line))

        return "\n".join(cleaned)
    
    def _extract_text_from_pdf(self, file_path: str) -> str:
        text_parts = []
        with pdfplumber.open(file_path) as pdf:
            for i, page in enumerate(pdf.pages, 1):
                text = page.extract_text()
                if text:
                    text_parts.append(f"{text.strip()}")
        return "\n\n".join(text_parts)

    def _extract_text_from_docx(self, file_path: str) -> str:
        try:
            return self._clean_pandoc_table(pypandoc.convert_file(file_path, 'markdown', extra_args=('--standalone','--wrap=none')))

        except Exception as e:
            return f"[Ошибка pypandoc]: {str(e)}"

    def split_text_to_chunks(self, text, chunk_size=500, overlap=50):
        words = re.findall(r'\w+|\S', text)
        chunks = []
        for i in range(0, len(words), chunk_size - overlap):
            chunk = " ".join(words[i:i+chunk_size])
            if chunk.strip():
                chunks.append(chunk)
        return chunks

    def run(self, tool_input: dict) -> dict:

        file_path = str(tool_input.get("file_path"))
        file_name = str(tool_input.get("file_name"))

        file_ext = file_name.split(".")[-1].lower()

        if file_ext == "pdf":
            cv_text = self._extract_text_from_pdf(file_path)
        elif file_ext == "docx":
            cv_text = self._extract_text_from_docx(file_path)
        else:
            raise ValueError("Unsupported file type. Only PDF and DOCX are supported.")

        return {
            "next_tool": CheckCVTool(), 
            "tool_input": { 
                "cv_text": cv_text 
                },
            "job_status": {
                "message": "Checking if it's CV or Resume",
                "percentage": 20,
                }
            }
    

class CheckCVTool(BaseTool):
    name = "CheckCV"
    description = "Check if the given text is a CV or resume."
    input_schema = {"cv_text": "str"}
    output_schema = {"result": "bool (either 'True' or 'False')"}

    def __init__(self):
        super().__init__()
        self.llm_service = thogetherAIService("cv_agent/CheckCVTool_sys.txt", "cv_agent/CheckCVTool.txt")

    def run(self, tool_input: dict) -> dict:
        cv_text = str(tool_input.get("cv_text"))

        prompt_vars = {
            "user": [{"name": "cv_text", "value": cv_text}],
        }

        for attempt in range(1, self.max_retries + 1):
            try:
                answer = self.llm_service.ask_llm(
                    prompt_vars = prompt_vars,
                    model="mistralai/Mistral-7B-Instruct-v0.1",
                    temperature=0.0,
                    top_p=0.3
                )

                match answer:
                    case "repeat": 
                        time.sleep(15)
                        attempt -= 1
                    
                    case "True":
                        return {
                            "next_tool": DetectLanguageTool(), 
                            "tool_input": { 
                                "cv_text": cv_text 
                            },
                            "job_status": {
                                "message": "Detecting language",
                                "percentage": 30,
                            }
                        }
                    case "False":
                        raise ValueError("The uploaded document is neither CV nor resume.")

            except Exception as e:
                time.sleep(1)
                if attempt == self.max_retries:
                    raise ValueError("Translation not done after multiple LLM attempts")
                continue

class DetectLanguageTool(BaseTool):
    name = "DetectLanguage"
    description = "Detect the language of the input text."
    input_schema = {"cv_text": "str"}
    output_schema = {"language": "str (ISO 639-1 language code, e.g. 'en', 'ru', 'de')"}

    def __init__(self) -> None:
        super().__init__()
        self.lang_detect = LangDetectSingleton()

    def run(self, tool_input: dict) -> dict:
        cv_text = str(tool_input.get("cv_text"))
        
        language = self.lang_detect.detect(cv_text)

        if language != "en":
            return {
                "next_tool": TranslateToEnglishTool(), 
                "tool_input": { 
                    "cv_text": cv_text,
                    "language": language
                    },
                "job_status": {
                    "message": "Translating file to English",
                    "percentage": 35,
                    }
                }
        else:
            return {
                "next_tool": SearchCandidateTool(), 
                "tool_input": { 
                    "cv_text_orig": cv_text
                    },
                "job_status": {
                    "message": "Looking for a candidate having a similar CV(s)",
                    "percentage": 40,
                    }
                }

class TranslateToEnglishTool(BaseTool):
    name = "TranslateToEnglish"
    description = "Translate the given text to English."
    input_schema = {"cv_text": "str"}
    output_schema = {"translated_text": "str"}

    def __init__(self):
        super().__init__()
        self.llm_service = thogetherAIService("cv_agent/TranslateToEnglishTool_sys.txt", "cv_agent/TranslateToEnglishTool.txt")

    def run(self, tool_input: dict) -> dict:
        cv_text = str(tool_input.get("cv_text"))
        language = str(tool_input.get("language"))

        prompt_vars = {
            "user": [{"name": "cv_text", "value": cv_text},
                     {"name": "language", "value": language}],
        }

        for attempt in range(1, self.max_retries + 1):
            try:
                answer = self.llm_service.ask_llm(
                    prompt_vars = prompt_vars,
                    model = "mistralai/Mistral-7B-Instruct-v0.1",
                    temperature=0.0,
                    top_p=0.3
                )

                if answer != "repeat":
                    json_answer = self._conver_llm_answer_to_json(answer)
                    cv_text_eng = json_answer.get("translated_text")
                    break

                else:
                    time.sleep(15)
                    attempt -= 1

            except Exception as e:
                time.sleep(1)
                if attempt == self.max_retries:
                    raise ValueError("Translation not done after multiple LLM attempts")
                continue

        return {
            "next_tool": SearchCandidateTool(), 
            "tool_input": { 
                     "cv_text_orig": cv_text, 
                     "cv_text_eng": cv_text_eng
                     } ,
                "job_status": {
                    "message": "Looking for a candidate having a similar CV(s)",
                    "percentage": 40,
                    }
            }

class SearchCandidateTool(BaseTool):
    name = "SearchCandidate"
    description = "Looks for a candidate having a similar CV(s)."
    input_schema = {"cv_text": "str"}
    output_schema = {"vectors": "List[List[float]]"}

    vectorDB = VectorDBService()

    def run(self, tool_input: dict) -> dict:
        cv_text = tool_input.get("cv_text_eng")

        if not cv_text:
            cv_text = tool_input.get("cv_text_orig")
        
        matches = self.vectorDB.search_candidates(query_text = cv_text)

        cv_id = None

        if len(matches) > 0 and matches[0].get("score") == 0.0:
            cv_id = matches[0].get("cv_id")
        else:
            cv_id = uuid.uuid4()

        result = {
            "next_tool": ExtractDataTool(),
            "tool_input": {
                "cv_id": cv_id,
                "cv_text_orig": tool_input.get("cv_text_orig"),
                "cv_text_eng": cv_text
            },
            "job_status": {
                "message": "Extracting candidate profile: Projects, Experience, Skills...",
                "percentage": 50,
            }
        }

        return result


class ExtractDataTool(BaseTool):
    name = "ExtractData"
    description = "Extracts information about candidate from the CV text"
    input_schema = {"cv_text": "str"}
    output_schema = {"chunks": "List[str]"}

    def run(self, tool_input: dict) -> dict:
        cv_text_orig = tool_input.get("cv_text_orig")
        cv_text_eng = tool_input.get("cv_text_eng")
        cv_id = tool_input.get("cv_id")

        result = asyncio.run(self._run_in_parallel(cv_text_orig, cv_text_eng))

        match len(result):
            case 3:
                metadata, experience, skills = result
                return {
                    "next_tool": VectorizeTool(), 
                    "tool_input": { 
                        "cv_id": cv_id,
                        "cv_text_orig": cv_text_orig,
                        "metadata": metadata, 
                        "experience": experience,
                        "skills": skills
                        } ,
                    "job_status": {
                        "message": "Vectorising candidate profile",
                        "percentage": 50,
                        }
                    }
            case 6:
                metadata, experience, skills, metadata_eng, experience_eng, skills_eng = result
                return {
                    "next_tool": VectorizeTool(), 
                    "tool_input": { 
                        "cv_id": cv_id,
                        "cv_text_orig": cv_text_orig,
                        "cv_text_eng": cv_text_eng,
                        "metadata": metadata, 
                        "experience": experience,
                        "skills": skills,
                        "metadata_eng": metadata_eng, 
                        "experience_eng": experience_eng,
                        "skills_eng": skills_eng
                        } ,
                    "job_status": {
                        "message": "Vectorising candidate profile",
                        "percentage": 80,
                        }
                    }
            case _:
                raise ValueError("No data extracted from CV.")

    async def _run_in_parallel(self, cv_text_orig, cv_text_eng):
        tasks = [
            self._extract_metadata(cv_text_orig),
            self._extract_experience(cv_text_orig),
            self._extract_skills(cv_text_orig)
        ]
        
        if cv_text_eng and cv_text_orig != cv_text_eng:
            tasks += [
                self._extract_metadata(cv_text_eng),
                self._extract_experience(cv_text_eng),
                self._extract_skills(cv_text_eng)
            ]
        return await asyncio.gather(*tasks)

    async def _extract_metadata(self, cv_text_orig):
        print("LLM extracts metadata from CV...")
        sys_prompt_template = "cv_agent/ExtractDataTool/metadata_sys.txt"
        usr_prompt_template = "cv_agent/ExtractDataTool/metadata.txt"

        loop = asyncio.get_running_loop()
        result = await loop.run_in_executor(
            None,
            lambda: self._ask_llm(
                cv_text_orig, 
                sys_prompt_template, 
                usr_prompt_template, 
                "Llama-3.3-70b-versatile",
                0.0, 
                0.3)
        )   

        result = await loop.run_in_executor(
            None,
            lambda: self._extract_metadata_from_file(result)
        ) 

        return result
    
    def _extract_metadata_from_file(self, result):
        file_metadate = self.file.extract_file_metadata()

        result["filename"] = file_metadate.get("filename")
        result["filetype"] = file_metadate.get("filetype")
        result["filesize"] = file_metadate.get("filesize")
        result["uploaded_at"] = file_metadate.get("uploaded_at")

        return result

    async def _extract_experience(self, cv_text_orig):
        print("LLM extracts experience from CV...")

        sys_prompt_template = "cv_agent/ExtractDataTool/experience_sys.txt"
        usr_prompt_template = "cv_agent/ExtractDataTool/experience.txt"

        loop = asyncio.get_running_loop()
        result = await loop.run_in_executor(
            None,
            lambda: self._ask_llm(
                cv_text_orig, 
                sys_prompt_template, 
                usr_prompt_template, 
                "Llama-3.3-70b-versatile",
                0.3, 
                0.95)
            )

        return result

    async def _extract_skills(self, cv_text_orig):
        print("LLM extracts skills from CV...")
        sys_prompt_template = "cv_agent/ExtractDataTool/skill_sys.txt"
        usr_prompt_template = "cv_agent/ExtractDataTool/skill.txt"

        loop = asyncio.get_running_loop()
        result = await loop.run_in_executor(
            None,
            lambda: self._ask_llm(
                cv_text_orig, 
                sys_prompt_template, 
                usr_prompt_template, 
                "Llama-3.3-70b-versatile",
                0.5, 
                0.9)
        )

        return result

    def _ask_llm(self, cv_text, sys_prompt_template, usr_prompt_template, model, temperature, top_p):
        llm_service = GROQService(sys_prompt_template, usr_prompt_template)
        prompt_vars = {
            "user": [
                {"name": "cv_text", "value": cv_text}
            ],
        }

        for attempt in range(1, self.max_retries + 1):
            try:
                answer = llm_service.ask_llm(
                    model = model,
                    prompt_vars = prompt_vars,
                    temperature=temperature,
                    top_p=top_p
                )

                if answer != "repeat":
                    return self._conver_llm_answer_to_json(answer)
                else:
                    time.sleep(15)
                    attempt -= 1

            except Exception as e:
                time.sleep(1)
                if attempt == self.max_retries:
                    raise ValueError("Information not found after multiple LLM attempts")
                continue
    
class VectorizeTool(BaseTool):
    name = "Vectorize"
    description = "Vectorize a list of text chunks using an embedding model."
    input_schema = {"cv_text": "str"}
    output_schema = {"vectors": "List[List[float]]"}



    def __init__(self) -> None:
        super().__init__()

        self.embedder = Embedder()

    def run(self, tool_input: dict) -> dict:
        cv_text = tool_input.get("cv_text_eng")
        cv_id = str(tool_input.get("cv_id"))

        if not cv_text:
            cv_text = tool_input.get("cv_text_orig")

        vector_data = self.embedder.vectorise(cv_id, cv_text)

        tool_input["vector_data"] = vector_data

        return {
            "next_tool": StoreDataTool(), 
            "tool_input": tool_input,
            "job_status": {
                "message": "Updating DB...",
                "percentage": 90,
                }
        }

class StoreDataTool(BaseTool):
    name = "StoreData"
    description = "Store candidate data and CV."
    input_schema = {"cv_text": "str"}
    output_schema = {"vectors": "List[List[float]]"}

    def __init__(self) -> None:
        super().__init__()

        self.cv_repository = CVRepository(next(get_session()))
        self.candidates_repository = CandidatesRepository(next(get_session()))

        self.VectorDB = VectorDBService()

    def run(self, tool_input: dict) -> dict:
        cv_id = tool_input.get("cv_id")

        if cv_id is None:
            raise ValueError("cv_id must not be None")

        metadata = tool_input.get("metadata")
        experience = tool_input.get("experience")
        skills = tool_input.get("skills")
        vector_data = tool_input.get("vector_data")

        candidate_id = self.flush_candidate(cv_id, metadata)
        self.flush_meta(cv_id, candidate_id, metadata)
        self.flush_experience(cv_id, experience)
        self.flush_skill(cv_id, skills)
        self.flush_vector_data(cv_id, vector_data)

        return {
            "tool_input": tool_input,
            "job_status": {
                "message": "Successfully processed",
                "percentage": 100,
                }
            }

    def flush_candidate(self, cv_id: uuid.UUID, metadata):
        candidate_id = self.cv_repository.gather_candidate_id_by_cv_id(cv_id)

        if candidate_id:
            if isinstance(candidate_id, str):
                candidate_id = uuid.UUID(candidate_id)

        candidate = Candidate(
            candidate_id=candidate_id,
            candidate_name=metadata.get("candidate_name"),
            birth_date=metadata.get("birth_date"),
            email=metadata.get("email"),
            phone=metadata.get("phone"),
            country=metadata.get("country"),
            native_language=metadata.get("native_language")
        )
        candidate_id = self.candidates_repository.add_or_update_candidate(candidate)

        return candidate_id

    def flush_meta(self, cv_id: uuid.UUID, candidate_id, raw_metadata):
        metadata = CVMeta(
            cv_id=cv_id,
            candidate_id = candidate_id,
            filename=raw_metadata.get("filename"),
            filetype=raw_metadata.get("filetype"),
            filesize=raw_metadata.get("filesize"),
            uploaded_at=raw_metadata.get("uploaded_at"),
            language=raw_metadata.get("language")
        )
        self.cv_repository.add_or_update_cv(metadata)

    def flush_experience(self, cv_id: uuid.UUID, raw_experience):
        experiences = []
        for experience in raw_experience:
            cv_experience = CVExperience(
                id=uuid.uuid4(),
                cv_id=cv_id,
                position=experience.get("position"),
                company=experience.get("company"),
                industry=experience.get("industry"),
                start_date=experience.get("start_date"),
                end_date=experience.get("end_date"),
                description=experience.get("description", ""),
                technologies=experience.get("technologies"),
            )
            experiences.append(cv_experience)
        if experiences:
            self.cv_repository.add_or_update_experience(experiences, cv_id)

    def flush_skill(self, cv_id: uuid.UUID, raw_skills):
        skills = []
        for raw_skill in raw_skills:
            cv_skill = CVSkill(
                id=uuid.uuid4(),
                cv_id=cv_id,
                skill_name=raw_skill.get("skill_name"),
                skill_level=raw_skill.get("skill_level"),
                description=raw_skill.get("description", "")
            )
            skills.append(cv_skill)
        if skills:
            self.cv_repository.add_or_update_skill(skills, cv_id)

    def flush_vector_data(self, cv_id: uuid.UUID, vector_data):
        self.VectorDB.delete_by_cv_id(cv_id)
        self.VectorDB.add(cv_id, vector_data)

