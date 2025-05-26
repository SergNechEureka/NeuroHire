# backend/routes/cv.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db import get_session
from ..file_metadata.crud import get_all_cvs
from ..users.auth import current_active_user
from ..users.models import User

router = APIRouter()

@router.get("/cvs")
def list_cvs(user: User = Depends(current_active_user), session: Session = Depends(get_session)):
#async def get_cvs(session: AsyncSession = Depends(get_async_session)):
    cvs = get_all_cvs(session)
    return cvs