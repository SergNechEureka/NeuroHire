import os

from fastapi import Depends
from sqlmodel import create_engine, Session
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from fastapi_users.db import SQLAlchemyUserDatabase
from api.models.base import Base
from api.users.models import User

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL environment variable is not set.")

engine = create_engine(url=DATABASE_URL, echo=True)

ASYNC_DATABASE_URL = os.getenv("ASYNC_DATABASE_URL")
if ASYNC_DATABASE_URL is None:
    raise ValueError("DATABASE_URL environment variable is not set.")

async_engine = create_async_engine(url=ASYNC_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
AsyncSessionLocal = async_sessionmaker(bind=async_engine, class_=AsyncSession, expire_on_commit=False)

def get_session():
    with Session(engine) as session:
        yield session

async def get_async_session():
    async with AsyncSession(async_engine) as session:
        yield session

async def create_db_and_tables():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)