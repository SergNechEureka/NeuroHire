from fastapi import APIRouter

from ..users.auth import fastapi_users, auth_backend
from ..users.schemas import UserRead, UserCreate
from ..users.models import User
from ..users.auth import auth_backend

router = APIRouter()

router.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)
router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate), prefix="/auth", tags=["auth"]
)
router.include_router(
    fastapi_users.get_users_router(UserRead, UserCreate), prefix="/users", tags=["users"]
)