from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from api.db import get_session
from api.candidates_db.CVRepository import CVRepository
from api.users.auth import current_active_user
from api.users.models import User

router = APIRouter()

@router.get("/cvs")
async def list_cvs(user: User = Depends(current_active_user), session: Session = Depends(get_session)):
    try:
        cv_repository = CVRepository(session)
        cvs = cv_repository.get_all()
        return cvs
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))