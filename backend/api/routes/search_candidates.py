from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from api.vector_db.VectorDBService import VectorDBService
from api.candidates_db.CVRepository import CVRepository
from api.users.models import User
from api.users.auth import current_active_user
from api.db import get_session

router = APIRouter()

@router.post("/search_candidates")
def search_endpoint(query: str, user: User = Depends(current_active_user), session: Session = Depends(get_session)):
    try:
        vectorDB = VectorDBService()
        results = vectorDB.search_candidates(query)

        cv_repository = CVRepository(session)

        unique_cv_ids = set(r["cv_id"] for r in results)
        candidates = []
        for cv_id in unique_cv_ids:
            meta = cv_repository.get_cv_by_id(cv_id) 
            candidates.append({
                "cv_id": cv_id,
                "meta": meta
            })
        return {"results": candidates}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))