from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import date, datetime
import uuid

class CVMeta(SQLModel, table=True):
    cv_id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
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

    experience: List["CVExperience"] = Relationship(back_populates="cv")
    skills: List["CVSkill"] = Relationship(back_populates="cv")

class CVExperience(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    cv_id: str = Field(foreign_key="cvmeta.cv_id")
    position: str
    company: Optional[str]
    industry: Optional[str]
    start_date: Optional[str]
    end_date: Optional[str]
    description: Optional[str]
    technologies: Optional[str]
    cv: Optional[CVMeta] = Relationship(back_populates="experience")

class CVSkill(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    cv_id: str = Field(foreign_key="cvmeta.cv_id")
    skill_name: str
    skill_level: Optional[str]
    description: Optional[str]
    cv: Optional[CVMeta] = Relationship(back_populates="skills")