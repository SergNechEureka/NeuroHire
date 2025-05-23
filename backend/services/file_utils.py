import os
import shutil
import uuid

from sqlmodel import Session
from datetime import datetime
from ..file_metadata.models import CVMeta

from ..file_metadata.crud import search_cv

def save_temp_file(file, file_ext):
    temp_path = f"temp.{file_ext}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return temp_path

def remove_file(path):
    if os.path.exists(path):
        os.remove(path)

def generate_file_metadata(session: Session, sem_meta, file, temp_path):
    cv_meta = CVMeta(
        candidate_name=sem_meta.get("candidate_name"),
        birth_date=sem_meta.get("birth_date"),
        email=sem_meta.get("email"),
        phone=sem_meta.get("phone"),
        country=sem_meta.get("country")
    )

    db_cv = search_cv(session, cv_meta)

    if db_cv != None:
        cv_id = db_cv.cv_id
    else:
        cv_id = str(uuid.uuid4())

    return {
        "cv_id": cv_id,
        "filename": file.filename,
        "filetype": file.filename.split('.')[-1].lower(),
        "filesize": os.path.getsize(temp_path),
        "uploaded_at": datetime.utcnow()
    }