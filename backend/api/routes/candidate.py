from fastapi import APIRouter, Depends, HTTPException, Response
from sqlmodel import Session

from ..users.auth import current_active_user
from ..users.models import User

from ..db import get_session
from ..candidates_db.CandidatesRepository import CandidatesRepository
from ..vector_db.VectorDBService import VectorDBService

router = APIRouter()

import uuid

@router.delete("/candidate/{id}")
def delete_cv(id: uuid.UUID, user: User = Depends(current_active_user), session: Session = Depends(get_session)):
    try:
        candidates = CandidatesRepository(session)
        success = candidates.delete_by_id(id)
    
        if not success:
            raise HTTPException(status_code=404, detail="Candidate not found")
    
        return Response(status_code=204)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/candidate/{id}")
def cv_metadata(id: uuid.UUID, user: User = Depends(current_active_user), session: Session = Depends(get_session)):
    try:
        candidates = CandidatesRepository(session)

        candidate = candidates.get_by_id(id)

        if not candidates:
            raise HTTPException(status_code=404, detail="Candidate not found")
    
        return candidate
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))