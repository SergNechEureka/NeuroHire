from sqlmodel import create_engine, Session
from pathlib import Path

def load_connection(filename: str) -> str:
    prompt_path = Path(__file__).parent.parent / "DBConnections" / filename
    with open(prompt_path, "r", encoding="utf-8") as f:
        return f.read()

DATABASE_URL = load_connection("PostgreSQL.txt")
engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session