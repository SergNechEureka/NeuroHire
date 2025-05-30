import uuid
from sqlmodel import Session, select
from datetime import datetime, timezone
from typing import Sequence
from .models import CVMeta, CVExperience, CVSkill

class CVRepository:
    def __init__(self, session: Session):
        self.session = session

    def gather_candidate_id_by_cv_id(self, cv_id: uuid.UUID):
        return self.session.exec(
            select(CVMeta.candidate_id).where(CVMeta.cv_id == cv_id)
        ).first()

    def search_cv(self, cv_id: uuid.UUID):
        return self.session.exec(
            select(CVMeta).where(CVMeta.cv_id == cv_id)
        ).first()

    def add_or_update_cv(self, cv: CVMeta):
        db_cv = self.search_cv(cv.cv_id)
        if db_cv is not None and db_cv.language == cv.language:
            db_cv.filename = cv.filename
            db_cv.filetype = cv.filetype
            db_cv.filesize = cv.filesize
            db_cv.updated_at = datetime.now(timezone.utc)
            db_cv.source = cv.source
            db_cv.status = "updated"
        else:
            self.session.add(cv)
        self.session.commit()
        return db_cv or cv

    def add_or_update_experience(self, experiences, cv_id: uuid.UUID):
        self.delete_experience_by_cv_id(cv_id, no_commit=True)
        self.session.add_all(experiences)
        self.session.commit()
        return experiences

    def add_or_update_skill(self, skills, cv_id: uuid.UUID):
        self.delete_skill_by_cv_id(cv_id, no_commit=True)
        self.session.add_all(skills)
        self.session.commit()
        return skills

    def get_all(self) -> Sequence[CVMeta]:
        return self.session.exec(select(CVMeta)).all()

    def delete_cv_by_id(self, cv_id: uuid.UUID) -> bool:
        obj = self.search_cv(cv_id)
        if obj:
            self.delete_experience_by_cv_id(cv_id, True)
            self.delete_skill_by_cv_id(cv_id, True)
            self.session.delete(obj)
            self.session.commit()
            return True
        return False

    def delete_experience_by_cv_id(self, cv_id: uuid.UUID, no_commit: bool) -> bool:
        experiences = self.session.exec(
            select(CVExperience).where(CVExperience.cv_id == cv_id)
        ).all()
        if experiences:
            for exp in experiences:
                self.session.delete(exp)
            if not no_commit:
                self.session.commit()
            return True
        return False

    def delete_skill_by_cv_id(self, cv_id: uuid.UUID, no_commit: bool) -> bool:
        skills = self.session.exec(
            select(CVSkill).where(CVSkill.cv_id == cv_id)
        ).all()
        if skills:
            for skill in skills:
                self.session.delete(skill)
            if not no_commit:
                self.session.commit()
            return True
        return False

    def get_cv_by_id(self, cv_id: uuid.UUID):
        return self.session.exec(
            select(CVMeta).where(CVMeta.cv_id == cv_id)
        ).first()