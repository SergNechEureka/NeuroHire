import uvicorn

from fastapi import FastAPI
from sqlmodel import SQLModel

from .services import parser
from .file_metadata.db import engine#
from .routes.upload import router as upload_router
from .routes.get_all_cvs import router as all_cvs_router
from .routes.cv import router as cv_router
from .routes.search_candidates import router as search_candidates

app = FastAPI()

app.include_router(upload_router)
app.include_router(all_cvs_router)
app.include_router(cv_router)
app.include_router(search_candidates)

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