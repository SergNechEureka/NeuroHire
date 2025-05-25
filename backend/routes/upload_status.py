from fastapi import APIRouter, HTTPException

# Global storage for upload job statuses (in-memory)
UPLOAD_STATUS = {}

router = APIRouter()

def set_status(job_id: str, status: str, progress: int = 0):
    """
    Update the status of an upload job.
    """
    UPLOAD_STATUS[job_id] = {
        "status": status,
        "progress": progress
    }

def get_status(job_id: str):
    """
    Retrieve the status of an upload job by job_id.
    """
    status = UPLOAD_STATUS.get(job_id)
    if status is None:
        raise HTTPException(status_code=404, detail="Status for job_id not found")
    return status

@router.get("/upload-status/{job_id}")
def get_upload_status(job_id: str):
    """
    Endpoint to get upload status by job_id.
    """
    return get_status(job_id)