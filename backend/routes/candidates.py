from fastapi import APIRouter, Depends
from sqlmodel import Session
from ..db import get_session
from ..file_metadata.CandidatesRepository import CandidatesRepository
from ..users.auth import current_active_user
from ..users.models import User

router = APIRouter()

@router.get("/candidates")
async def list_cvs(user: User = Depends(current_active_user), session: Session = Depends(get_session)):
    candidates_repository = CandidatesRepository(session)
    candidates = candidates_repository.get_all()
    return candidates