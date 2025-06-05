# backend/recreate_db.py
import os
from dotenv import load_dotenv
from sqlmodel import create_engine
from .candidates_db.models import Candidate, CVMeta, CandidateProjectRole, CVExperience, CVSkill
from .vector_db.VectorDBService import VectorDBService

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL environment variable is not set.")

engine = create_engine(url=DATABASE_URL, echo=True)

def recreate_db(engine):
    print("Dropping all tables...")
    Candidate.metadata.drop_all(bind=engine)
    CVMeta.metadata.drop_all(bind=engine)
    CandidateProjectRole.metadata.drop_all(bind=engine)
    CVExperience.metadata.drop_all(bind=engine)
    CVSkill.metadata.drop_all(bind=engine)
    print("Creating all tables...")
    Candidate.metadata.create_all(bind=engine)
    CVMeta.metadata.create_all(bind=engine)
    CandidateProjectRole.metadata.create_all(bind=engine)
    CVExperience.metadata.create_all(bind=engine)
    CVSkill.metadata.create_all(bind=engine)
    print("Done! All tables have been recreated.")

    vector_db = VectorDBService()
    vector_db.clear_db()

if __name__ == "__main__":
    recreate_db(engine)