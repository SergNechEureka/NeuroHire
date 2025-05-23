from sqlmodel import SQLModel, Field
from datetime import datetime, date

class CVMeta(SQLModel, table=True):
    cv_id: str = Field(primary_key=True)
    filename: str
    filetype: str | None = None
    filesize: int | None = None
    candidate_name: str | None = None
    email: str | None = None
    phone: str | None = None               
    country: str | None = None             
    birth_date: date | None = None         
    position_applied: str | None = None
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime | None = None
    status: str = Field(default="active")
    source: str | None = None
    parsed_ok: bool | None = None
    parsing_info: str | None = None
    language: str | None = None
    file_path: str | None = None