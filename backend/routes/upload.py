
from fastapi import APIRouter, UploadFile, File, Depends, BackgroundTasks
from typing import List
from ..services.file_utils import TempFile
from ..services.process_cv import CVFileProcessor  


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
        tempFile = TempFile(file)

        cv_file_processor = CVFileProcessor(tempFile)
        
        job_id = cv_file_processor.start_job(background_tasks)

        job_ids.append({"filename": file.filename, "jobId": job_id})

    return {"jobs": job_ids}