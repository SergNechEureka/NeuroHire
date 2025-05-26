from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from ..users.auth import current_active_user
from ..users.models import User

from ..db import get_session
from ..file_metadata.crud import delete_cv_by_id
from ..file_metadata.crud import get_cv_by_id
from ..vector_db.crud import delete_by_cv_id as delete_embeddings_by_cv_id, get_by_cv_id as get_embeddings_by_cv_id

router = APIRouter()

@router.delete("/cv/{cv_id}")
def delete_cv(cv_id: str, user: User = Depends(current_active_user), session: Session = Depends(get_session)):
    delete_embeddings_by_cv_id(cv_id)
    
    success = delete_cv_by_id(session, cv_id)
    if not success:
        raise HTTPException(status_code=404, detail="CV metadatanot found")
    
    return Response(status_code=204)

@router.get("/cv/{cv_id}")
def cv_metadata(cv_id: str, user: User = Depends(current_active_user), session: Session = Depends(get_session)):
    cv = get_cv_by_id(session, cv_id)
    if not cv:
        raise HTTPException(status_code=404, detail="CV metadata not found")
    return cv