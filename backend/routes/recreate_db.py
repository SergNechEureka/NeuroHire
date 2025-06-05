from fastapi import APIRouter
from ..recreate_db import recreate_db

router = APIRouter()

from ..db import engine  # Make sure to import your engine object

@router.get("/recreate_db")
async def route_recreate_db():
    recreate_db(engine)