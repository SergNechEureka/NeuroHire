from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from api.models.base import Base

class User(SQLAlchemyBaseUserTableUUID, Base):
    pass