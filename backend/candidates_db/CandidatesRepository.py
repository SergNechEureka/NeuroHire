import uuid
from sqlmodel import Session, select, delete
from sqlalchemy import or_, and_, delete
from typing import Sequence, Optional, List
from .models import Candidate
from .CVRepository import CVRepository
from fastapi import HTTPException

class CandidatesRepository:
    def __init__(self, session: Session):
        self.session = session
        self.cv_repository = CVRepository(session)

    def search_candidate(self, candidate: Candidate) -> Optional[Candidate]:
        candidate_db = self.session.exec(
            select(Candidate).where(Candidate.candidate_id == candidate.candidate_id)
        ).first()

        if candidate_db:
            return candidate_db

        filters = []
        if candidate.candidate_name and candidate.birth_date:
            filters.append(
                and_(
                    Candidate.candidate_name == candidate.candidate_name,
                    Candidate.birth_date == candidate.birth_date
                )
            )
        elif candidate.candidate_name:
            filters.append(Candidate.candidate_name == candidate.candidate_name)
        if candidate.email:
            filters.append(Candidate.email == candidate.email)
        if candidate.phone:
            filters.append(Candidate.phone == candidate.phone)

        if filters:
            return self.session.exec(
                select(Candidate).where(or_(*filters))
            ).first()

    def add_or_update_candidate(self, candidate: Candidate):
        candidate_db = self.search_candidate(candidate)
        if candidate_db:
            if candidate.candidate_name and len(candidate_db.candidate_name) < len(candidate.candidate_name):
                candidate_db.candidate_name = candidate.candidate_name
            if candidate.candidate_name:
                candidate_db.email = candidate.email
            if candidate.candidate_name:
                candidate_db.candidate_name = candidate.candidate_name

            candidate.candidate_id = candidate_db.candidate_id
        else:
            candidate.candidate_id = uuid.uuid4()
            self.session.add(candidate)

        self.session.commit()
        return candidate.candidate_id

    def get_all(self) -> Sequence[Candidate]:
        return self.session.exec(select(Candidate)).all()
    
    def get_by_id(self, id: uuid.UUID) -> Optional[Candidate]:
        candidate = self.session.exec(
            select(Candidate).where(Candidate.candidate_id == id)
        ).first()

        if not candidate:
            raise HTTPException(status_code=404, detail="Candidate not found")
        
        return candidate

    def delete_by_id(self, id: uuid.UUID) -> bool:
        candidate = self.get_by_id(id)

        if candidate:
            self.cv_repository.delete_cvs_of_candidate(id)

            self.session.delete(candidate)
            self.session.commit()
            return True
        return False

    def delete_by_ids(self, ids: List[uuid.UUID]) -> bool:
        self.cv_repository.delete_cvs_of_candidates(ids)

        self.session.exec(
            delete(Candidate).where(Candidate.candidate_id.in_(ids))
        )
        self.session.commit()
        return True