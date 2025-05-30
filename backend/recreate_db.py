# backend/recreate_db.py
import os
from dotenv import load_dotenv
from sqlmodel import create_engine, Session
from sqlalchemy.orm import sessionmaker, declarative_base
from file_metadata.models import Candidate, CVMeta, CandidateProjectRole, CVExperience, CVSkill

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL environment variable is not set.")

engine = create_engine(url=DATABASE_URL, echo=True)

#Base = declarative_base()



if __name__ == "__main__":
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

#    User.metadata.drop_all(bind=engine)
#    User.metadata.create_all(bind=engine)