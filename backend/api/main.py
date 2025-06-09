import os
import uvicorn
from contextlib import asynccontextmanager

from fastapi import FastAPI
from sqlmodel import SQLModel
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base
from fastapi.middleware.cors import CORSMiddleware

from .db import engine, async_engine, Base
from .routes.upload import router as upload_router
from .routes.cvs import router as cvs
from .routes.cv import router as cv
from .routes.search_candidates import router as search_candidates
from .routes.upload_status import router as get_upload_status
from .routes.candidates import router as candidates
from .routes.candidate import router as candidate
from .routes.auth import router as auth_router
from .routes.recreate_db import router as recreate_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create SQLModel tables
    SQLModel.metadata.create_all(engine)
    # Create SQLAlchemy tables (for User model)
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(lifespan=lifespan)

load_dotenv()

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS")
if ALLOWED_HOSTS is None:
    raise ValueError("ALLOWED_HOSTS environment variable is not set.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(cvs)
app.include_router(cv)
app.include_router(search_candidates)
app.include_router(get_upload_status)
app.include_router(auth_router)
app.include_router(candidates)
app.include_router(candidate)
app.include_router(recreate_db)

@app.get("/")
def read_root():
    return {"message": "Welcome to API NeuroHire!"}

@app.get("/ping")
def ping():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5050)