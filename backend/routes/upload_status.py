from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from ..db import get_session
from ..users.auth import current_active_user
from ..users.models import User

# Global storage for upload job statuses (in-memory)
UPLOAD_STATUS = {}

router = APIRouter()

def set_status(job_id: str, status: str, progress: int = 0, user: User = Depends(current_active_user), session: Session = Depends(get_session)):
    try:
        UPLOAD_STATUS[job_id] = {
            "status": status,
            "progress": progress
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_status(job_id: str, user: User = Depends(current_active_user), session: Session = Depends(get_session)):
    try:
        status = UPLOAD_STATUS.get(job_id)
        if status is None:
            raise HTTPException(status_code=404, detail="Status for job_id not found")
        # Если статус завершён или ошибка — удалить из памяти
        if status.get("progress") in (100, -1):
            clear_status(job_id)
        return status
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def clear_status(job_id: str):
    if job_id in UPLOAD_STATUS:
        del UPLOAD_STATUS[job_id]

@router.get("/upload-status/{job_id}")
def get_upload_status(job_id: str, user: User = Depends(current_active_user), session: Session = Depends(get_session)):
    try:
        return get_status(job_id)
         
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))