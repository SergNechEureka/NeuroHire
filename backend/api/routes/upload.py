from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks, Depends
from typing import List
from api.services.file_utils import TempFile
from api.services.process_cv import CVFileProcessor 
from api.users.models import User
from sqlalchemy.orm import Session
from api.users.auth import current_active_user
from api.db import get_session


router = APIRouter()

@router.post("/upload")
def upload_files(
    background_tasks: BackgroundTasks,
    files: List[UploadFile] = File(...),
    user: User = Depends(current_active_user), session: Session = Depends(get_session)
):
    try:
        job_ids = []

        for file in files:
            tempFile = TempFile(file)

            cv_file_processor = CVFileProcessor(tempFile)
        
            job_id = cv_file_processor.start_job(background_tasks)

            job_ids.append({"filename": file.filename, "jobId": job_id})

        return {"jobs": job_ids}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))