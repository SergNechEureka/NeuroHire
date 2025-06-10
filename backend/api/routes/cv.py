from fastapi import APIRouter, Depends, HTTPException, Response
from sqlmodel import Session

from api.users.auth import current_active_user
from api.users.models import User

from api.db import get_session
from api.candidates_db.CVRepository import CVRepository
from api.vector_db.VectorDBService import VectorDBService

router = APIRouter()

import uuid

@router.delete("/cv/{id}")
def delete_cv(id: uuid.UUID, user: User = Depends(current_active_user), session: Session = Depends(get_session)):
    try: 
        vectorDB = VectorDBService()
    
        vectorDB.delete_by_cv_id(id)

        cv_repository = CVRepository(session)
        success = cv_repository.delete_cv_by_id(id)
    
        if not success:
            raise HTTPException(status_code=404, detail="CV metadatanot found")
    
        return Response(status_code=204)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/cv/{id}")
def get_cv(id: uuid.UUID, user: User = Depends(current_active_user), session: Session = Depends(get_session)):   
    try:
        cv_repository = CVRepository(session)

        cv = cv_repository.get_cv_by_id(id)

        if not cv:
            raise HTTPException(status_code=404, detail="CV metadata not found")
        return cv
 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))