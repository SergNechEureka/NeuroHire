# backend/recreate_db.py
import os
from dotenv import load_dotenv
from sqlmodel import create_engine, Session
from sqlalchemy.orm import sessionmaker, declarative_base
from users.models import User, Base

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL environment variable is not set.")

engine = create_engine(url=DATABASE_URL, echo=True)

#Base = declarative_base()



if __name__ == "__main__":
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("Done! All tables have been recreated.")

    User.metadata.drop_all(bind=engine)
    User.metadata.create_all(bind=engine)