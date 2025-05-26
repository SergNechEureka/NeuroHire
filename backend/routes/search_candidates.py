from fastapi import APIRouter, Depends
from ..vector_db.crud import search_candidates
from ..file_metadata.crud import get_cv_by_id
from ..db import get_session

router = APIRouter()

@router.post("/search_candidates")
def search_endpoint(query: str, session=Depends(get_session)):
    results = search_candidates(query)

    unique_cv_ids = set(r["cv_id"] for r in results)
    candidates = []
    for cv_id in unique_cv_ids:
        meta = get_cv_by_id(session, cv_id) 
        candidates.append({
            "cv_id": cv_id,
            "meta": meta
        })
    return {"results": candidates}