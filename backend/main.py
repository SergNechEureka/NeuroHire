import os
import uvicorn

from fastapi import FastAPI
from sqlmodel import SQLModel
from dotenv import load_dotenv


from .db import engine
from .routes.upload import router as upload_router
from .routes.cvs import router as cvs
from .routes.cv import router as cv
from .routes.search_candidates import router as search_candidates
from .routes.upload_status import router as get_upload_status
from .routes.candidates import router as candidates
from .routes.candidate import router as candidate
from fastapi.middleware.cors import CORSMiddleware
from .routes.auth import router as auth_router
from .routes.recreate_db import router as recreate_db  # Add this import

app = FastAPI()

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

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

@app.get("/")
def read_root():
    return {"message": "Welcome to API NeuroHire!"}

@app.get("/ping")
def ping():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)