import uuid
import threading

from ..file_metadata.models import CVMeta, CVExperience, CVSkill
from ..file_metadata.crud import add_or_update_cv, add_or_update_experience, add_or_update_skill
from ..db import SessionLocal
from ..vector_db.crud import add as add_embeddings, delete_by_cv_id as delete_embeddings_by_cv_id, get_by_cv_id as get_embeddings_by_cv_id
from ..routes.upload_status import set_status  # import status helper
from ..routes.upload import BackgroundTasks
from .background_pool import file_processing_semaphore


from ..agents.cv_agent import CVProcessingAgent

def start_jobs_for_files(background_tasks: BackgroundTasks, file):
    """
    Starts background jobs for each file and returns job_ids for tracking.
    """
    job_id = str(uuid.uuid4())
    set_status(job_id, "Starting", 0)

    set_status(job_id, "Saving file", 10)

    file = File(filename)





    file_ext = file.filename.split(".")[-1].lower()
    temp_path = file_utils.save_temp_file(file, file_ext)

    thread = threading.Thread(target=process_file_job, args=(temp_path, file.filename, job_id))
    thread.start()
    
    return job_id

def process_file_job(temp_path: str, filename: str, job_id: str):
    """
    Full processing pipeline for a single CV file.
    Uses a separate DB session for thread safety.
    Updates job status after each stage.
    """
    #file_processing_semaphore.acquire()

    session = SessionLocal()

    file_ext = filename.split(".")[-1].lower()

    try:
        set_status(job_id, f"Uploading file ({file_ext})", 10)

        cv_processing_agent = CVProcessingAgent()

        cv_processing_agent.process(temp_path, filename, job_id)

       
        """if file_ext == "pdf":
            text = parser.extract_text_from_pdf(temp_path)
        elif file_ext == "docx":
            text = parser.extract_text_from_docx(temp_path)
        else:
            set_status(job_id, "Unsupported file type", -1)
            file_utils.remove_file(temp_path)
            return

        set_status(job_id, "Extracting metadata", 30)
        sem_meta, parsed_ok, parsing_info = meta_extractor.extract_semantic_metadata(text)

        set_status(job_id, "Extracting experience", 40)
        sem_experience, _, _ = meta_extractor.extract_semantic_experience(text)

        set_status(job_id, "Extracting skills", 50)
        sem_skill, _, _ = meta_extractor.extract_semantic_skill(text)

        meta = file_utils.generate_file_metadata(session, sem_meta, filename, temp_path)
        file_utils.remove_file(temp_path)

        set_status(job_id, "Saving to DB", 70)
        flush_meta(session, sem_meta, parsed_ok, parsing_info, meta)
        flush_experience(session, sem_experience, meta["cv_id"])
        flush_skill(session, sem_skill, meta["cv_id"])

        set_status(job_id, "Vectorizing", 85)
        delete_embeddings_by_cv_id(meta["cv_id"])
        chunks = parser.split_text_to_chunks(text, chunk_size=500, overlap=50)
        add_embeddings(meta["cv_id"], chunks)

        set_status(job_id, "Completed", 100)
        pass"""

        file_utils.remove_file(temp_path)
        pass

    except Exception as e:
        set_status(job_id, f"Error: {str(e)}", -1)
        file_utils.remove_file(temp_path)
        pass
    finally:
        session.close()
        file_processing_semaphore.release()

def flush_meta(session, sem_meta, parsed_ok, parsing_info, meta):
    cv_meta = CVMeta(
        cv_id=meta["cv_id"],
        filename=meta["filename"],
        filetype=meta.get("filetype"),
        filesize=meta.get("filesize"),
        uploaded_at=meta.get("uploaded_at"),
        candidate_name=sem_meta.get("candidate_name"),
        birth_date=sem_meta.get("birth_date"),
        email=sem_meta.get("email"),
        phone=sem_meta.get("phone"),
        country=sem_meta.get("country"),
        parsed_ok=parsed_ok,
        parsing_info=parsing_info
    )
    add_or_update_cv(session, cv_meta)

def flush_experience(session, sem_experience, cv_id):
    experiences = []
    for experience in sem_experience:
        cv_experience = CVExperience(
            id=str(uuid.uuid4()),
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
        add_or_update_experience(session, experiences, cv_id)

def flush_skill(session, sem_skill, cv_id):
    skills = []
    for skill in sem_skill:
        cv_skill = CVSkill(
            id=str(uuid.uuid4()),
            cv_id=cv_id,
            skill_name=skill.get("skill_name"),
            skill_level=skill.get("skill_level"),
            description=skill.get("description", "")
        )
        skills.append(cv_skill)
    if skills:
        add_or_update_skill(session, skills, cv_id)