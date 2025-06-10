from fastapi import APIRouter, HTTPException
from renew_db import recreate_db

router = APIRouter()

from api.db import engine  # Make sure to import your engine object

@router.get("/recreate_db")
async def route_recreate_db():
    try:
        recreate_db(engine)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))