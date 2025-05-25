# backend/routes/cv.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..file_metadata.db import get_session
from ..file_metadata.crud import get_all_cvs

router = APIRouter()

@router.get("/cvs")
def list_cvs(session: Session = Depends(get_session)):
    cvs = get_all_cvs(session)
    return cvs