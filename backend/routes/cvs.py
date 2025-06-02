from fastapi import APIRouter, Depends
from sqlmodel import Session
from ..db import get_session
from ..CandidatesDB.CVRepository import CVRepository
from ..users.auth import current_active_user
from ..users.models import User

router = APIRouter()

@router.get("/cvs")
async def list_cvs(user: User = Depends(current_active_user), session: Session = Depends(get_session)):
    cv_repository = CVRepository(session)
    cvs = cv_repository.get_all()
    return cvs