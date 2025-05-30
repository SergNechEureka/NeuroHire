from fastapi import APIRouter, Depends, HTTPException, Response
from sqlmodel import Session

from ..users.auth import current_active_user
from ..users.models import User

from ..db import get_session
from ..file_metadata.CVRepository import CVRepository
from ..vector_db.crud import VectorDBService

router = APIRouter()

import uuid

@router.delete("/cv/{cv_id}")
def delete_cv(cv_id: str, user: User = Depends(current_active_user), session: Session = Depends(get_session)):
    vectorDB = VectorDBService()
    try:
        cv_uuid = uuid.UUID(cv_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid CV ID format")
    
    vectorDB.delete_by_cv_id(cv_uuid)

    cv_repository = CVRepository(session)
    success = cv_repository.delete_cv_by_id(cv_uuid)
    
    if not success:
        raise HTTPException(status_code=404, detail="CV metadatanot found")
    
    return Response(status_code=204)

@router.get("/cv/{cv_id}")
def cv_metadata(cv_id: str, user: User = Depends(current_active_user), session: Session = Depends(get_session)):
    try:
        cv_uuid = uuid.UUID(cv_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid CV ID format")
    
    cv_repository = CVRepository(session)

    cv = cv_repository.get_cv_by_id(cv_uuid)

    if not cv:
        raise HTTPException(status_code=404, detail="CV metadata not found")
    return cv