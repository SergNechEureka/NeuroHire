from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import date, datetime, timezone
import uuid

class Candidate(SQLModel, table=True):
    candidate_id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    candidate_name: str = Field(max_length=255)
    email: Optional[str] = Field(default=None, max_length=320)
    phone: Optional[str] = Field(default=None, max_length=50)
    country: Optional[str] = Field(default=None, max_length=100)
    birth_date: Optional[date] = Field(default=None)
    native_language: Optional[str] = Field(default=None, max_length=100)

    cvs: List["CVMeta"] = Relationship(back_populates="candidate", sa_relationship_kwargs={"cascade": "all, delete"})
    ProjectRoles: List["CandidateProjectRole"] = Relationship(back_populates="candidate", sa_relationship_kwargs={"cascade": "all, delete"})

class CandidateProjectRole(SQLModel, table=True):
    project_role: str = Field(primary_key=True, max_length=100)
    candidate_id: uuid.UUID = Field(foreign_key="candidate.candidate_id", index=True, ondelete="CASCADE")

    candidate: Optional[Candidate] = Relationship(back_populates="ProjectRoles")

class CVMeta(SQLModel, table=True):
    cv_id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    candidate_id: uuid.UUID = Field(foreign_key="candidate.candidate_id", index=True, ondelete="CASCADE")
    filename: str
    filetype: str | None = None
    filesize: int | None = None           
    uploaded_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime | None = None
    status: str = Field(default="active")
    source: str | None = None
    language: str | None = None

    candidate: Optional[Candidate] = Relationship(back_populates="cvs")

    experience: List["CVExperience"] = Relationship(back_populates="cv", sa_relationship_kwargs={"cascade": "all, delete"})
    skills: List["CVSkill"] = Relationship(back_populates="cv", sa_relationship_kwargs={"cascade": "all, delete"})

class CVExperience(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    cv_id: uuid.UUID = Field(foreign_key="cvmeta.cv_id", index=True, ondelete="CASCADE")
    position: str
    company: Optional[str]
    industry: Optional[str]
    start_date: Optional[str]
    end_date: Optional[str]
    description: Optional[str]
    technologies: Optional[str]
    cv: CVMeta = Relationship(back_populates="experience")

class CVSkill(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    cv_id: uuid.UUID = Field(foreign_key="cvmeta.cv_id", index=True, ondelete="CASCADE")
    skill_name: str
    skill_level: Optional[str]
    description: Optional[str]
    cv: CVMeta = Relationship(back_populates="skills")