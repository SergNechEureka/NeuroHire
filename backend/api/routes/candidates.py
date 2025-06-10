from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List
import uuid
from pydantic import BaseModel
from api.db import get_session
from api.candidates_db.CandidatesRepository import CandidatesRepository
from api.users.auth import current_active_user
from api.users.models import User

router = APIRouter()
class Body(BaseModel):
    ids: List[uuid.UUID]

@router.get("/candidates")
async def get_candidates (user: User = Depends(current_active_user), session: Session = Depends(get_session)):
    try:
        candidates_repository = CandidatesRepository(session)
        candidates = candidates_repository.get_all()
        return candidates
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/candidates")
async def delete_candidates (body: Body, user: User = Depends(current_active_user), session: Session = Depends(get_session)):
    try:
        candidates_repository = CandidatesRepository(session)

        candidates_repository.delete_by_ids(body.ids)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
