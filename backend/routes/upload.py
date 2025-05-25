import uuid
from fastapi import APIRouter, UploadFile, File, Depends, BackgroundTasks
from typing import List
from ..services.process_cv import start_jobs_for_files  
from ..services.file_utils import save_temp_file# Импорт из нового файла

router = APIRouter()

@router.post("/upload")
def upload_files(
    background_tasks: BackgroundTasks,
    files: List[UploadFile] = File(...),
):
    """
    Upload and process multiple files. Each file is handled in a separate background task.
    Returns a list of job_ids for status tracking.
    """

    """
    Starts background jobs for each file and returns job_ids for tracking.
    """
    job_ids = []

    for file in files:
        job_id = start_jobs_for_files(background_tasks, file)

        job_ids.append({"filename": file.filename, "job_id": job_id})

    return {"jobs": job_ids}