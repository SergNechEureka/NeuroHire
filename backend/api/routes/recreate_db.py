from fastapi import APIRouter
from ...recreate_db import recreate_db
from fastapi import HTTPException

router = APIRouter()

from ..db import engine  # Make sure to import your engine object

@router.get("/recreate_db")
async def route_recreate_db():
    try:
        recreate_db(engine)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))