import os
from sqlmodel import create_engine, Session
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker

load_dotenv()

engine = create_engine(os.getenv("DATABASE_URL"), echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_session():
    with Session(engine) as session:
        yield session