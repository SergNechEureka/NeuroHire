from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..file_metadata.db import get_session
from ..file_metadata.crud import delete_cv_by_id
from ..file_metadata.crud import get_cv_by_id
from ..vector_db.crud import delete_by_cv_id as delete_embeddings_by_cv_id

router = APIRouter()

@router.delete("/cv_metadata/{cv_id}")
def delete_cv(cv_id: str, session: Session = Depends(get_session)):
    success = delete_cv_by_id(session, cv_id)
    if not success:
        raise HTTPException(status_code=404, detail="CV metadatanot found")
    
    success = delete_embeddings_by_cv_id(cv_id)
    if not success:
        raise HTTPException(status_code=404, detail="CV metadatanot found")
    
    return {"status": "deleted", "cv_id": cv_id}

@router.get("/cv_metadata/{cv_id}")
def cv_metadata(cv_id: str, session: Session = Depends(get_session)):
    cv = get_cv_by_id(session, cv_id)
    if not cv:
        raise HTTPException(status_code=404, detail="CV metadata not found")
    return cv