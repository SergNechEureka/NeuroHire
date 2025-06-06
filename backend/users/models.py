from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from ..models.base import Base

class User(SQLAlchemyBaseUserTableUUID, Base):
    pass