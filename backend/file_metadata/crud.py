from sqlmodel import Session
from .models import CVMeta
from datetime import datetime
from sqlalchemy.orm import Session
from .models import CVMeta, CVExperience

def search_cv(session: Session, cv: CVMeta):
    return session.query(CVMeta).filter(
        CVMeta.candidate_name == cv.candidate_name,
        CVMeta.email == cv.email,
        CVMeta.phone == cv.phone,
        CVMeta.country == cv.country,
        CVMeta.birth_date == cv.birth_date,
        CVMeta.position_applied == cv.position_applied
    ).first()

def add_or_update_cv(session: Session, cv: CVMeta):
    db_cv = search_cv(session, cv)

    if db_cv != None:
        db_cv.filename = cv.filename
        db_cv.filetype = cv.filetype
        db_cv.filesize = cv.filesize
        db_cv.uploaded_at = datetime.utcnow()
        db_cv.status = "updated"
    else:
        session.add(cv)
    session.commit()
    return db_cv or cv

def add_or_update_experience(session: Session, experiences, cv_id: str):
    delete_experience_by_cv_id(session, cv_id)

    session.add_all(experiences)
    session.commit()
    return experiences

def add_or_update_skill(session: Session, skills, cv_id: str):
    delete_skill_by_cv_id(session, cv_id)

    session.add_all(skills)
    session.commit()
    return skills

def get_all_cvs(session: Session):
    return session.query(CVMeta).all()

def delete_cv_by_id(session: Session, cv_id: str) -> bool:
    from .models import CVMeta
    obj = session.query(CVMeta).filter(CVMeta.cv_id == cv_id).first()
    if obj:
        session.delete(obj)
        session.commit()
        return True
    return False

def delete_experience_by_cv_id(session: Session, cv_id: str) -> bool:
    from .models import CVExperience
    obj = session.query(CVExperience).filter(CVExperience.cv_id == cv_id)
    if obj:
        obj.delete()
        session.commit()
        return True
    return False

def delete_skill_by_cv_id(session: Session, cv_id: str) -> bool:
    from .models import CVSkill
    obj = session.query(CVSkill).filter(CVSkill.cv_id == cv_id)
    if obj:
        obj.delete()
        session.commit()
        return True
    return False

def get_cv_by_id(session: Session, cv_id: str):
    from .models import CVMeta
    return session.query(CVMeta).filter(CVMeta.cv_id == cv_id).first()