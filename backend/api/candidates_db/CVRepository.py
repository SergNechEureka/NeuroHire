import uuid
from sqlmodel import Session, select
from datetime import datetime, timezone
from typing import Sequence,List
from .models import CVMeta, CVExperience, CVSkill
from typing import Optional
from api.vector_db.VectorDBService import VectorDBService

class CVRepository:
    def __init__(self, session: Session):
        self.session = session
        self.vector_db = VectorDBService()

    def gather_candidate_id_by_cv_id(self, id: uuid.UUID):
        return self.session.exec(
            select(CVMeta.candidate_id).where(CVMeta.cv_id == id)
        ).first()

    def search_cv(self, id: uuid.UUID) -> Optional[CVMeta]:
        return self.session.exec(
            select(CVMeta).where(CVMeta.cv_id == id)
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

    def add_or_update_experience(self, experiences, id: uuid.UUID):
        self.delete_experience_by_cv_id(id, no_commit=True)
        self.session.add_all(experiences)
        self.session.commit()
        return experiences

    def add_or_update_skill(self, skills, id: uuid.UUID):
        self.delete_skill_by_cv_id(id, no_commit=True)
        self.session.add_all(skills)
        self.session.commit()
        return skills

    def get_all(self) -> Sequence[CVMeta]:
        return self.session.exec(select(CVMeta)).all()

    def delete_cv_by_id(self, id: uuid.UUID) -> bool:
        obj = self.search_cv(id)
        if obj:
            self.delete_experience_by_cv_id(id, True)
            self.delete_skill_by_cv_id(id, True)
            self.session.delete(obj)
            self.session.commit()
            return True
        return False

    def delete_experience_by_cv_id(self, id: uuid.UUID, no_commit: bool) -> bool:
        experiences = self.session.exec(
            select(CVExperience).where(CVExperience.cv_id == id)
        ).all()
        if experiences:
            for exp in experiences:
                self.session.delete(exp)
            if not no_commit:
                self.session.commit()
            return True
        return False

    def delete_skill_by_cv_id(self, id: uuid.UUID, no_commit: bool) -> bool:
        skills = self.session.exec(
            select(CVSkill).where(CVSkill.cv_id == id)
        ).all()
        if skills:
            for skill in skills:
                self.session.delete(skill)
            if not no_commit:
                self.session.commit()
            return True
        return False

    def get_cv_by_id(self, id: uuid.UUID):
        return self.session.exec(
            select(CVMeta).where(CVMeta.cv_id == id)
        ).first()
    
    def get_cvs_of_candidate(self, id: uuid.UUID):
        return self.session.exec(
            select(CVMeta).where(CVMeta.candidate_id == id)
        )
    
    def delete_cvs_of_candidate(self, id: uuid.UUID) -> bool:
        cvs = self.session.exec(
            select(CVMeta.cv_id).where(CVMeta.candidate_id == id)
        ).all()
    
        self.vector_db.delete_by_cv_ids(list(cvs))

        return True
    
    def delete_cvs_of_candidates(self, ids: List[uuid.UUID]) -> bool:
        cvs = self.session.exec(
            select(CVMeta.cv_id).where(CVMeta.candidate_id.in_(ids))
        ).all()
    
        self.vector_db.delete_by_cv_ids(list(cvs))

        return True