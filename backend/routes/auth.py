from fastapi import APIRouter

from ..users.auth import fastapi_users, get_jwt_strategy
from ..users.schemas import UserRead, UserCreate, UserUpdate
from ..users.models import User  # Ensure you import your User model
from uuid import UUID           # Import UUID if not already imported

from fastapi_users.authentication import AuthenticationBackend, Strategy, BearerTransport

# Ensure get_jwt_strategy is correctly typed
def get_jwt_strategy_dep() -> Strategy[User, UUID]:
    return get_jwt_strategy()

# Create a BearerTransport instance for sending JWT tokens in the Authorization header
jwt_transport = BearerTransport(tokenUrl="auth/jwt/login")

# Create auth_backend with correct type parameters
auth_backend = AuthenticationBackend[User, UUID](
    name="jwt",
    transport=jwt_transport,  # Use JWTTransport for JWT tokens
    get_strategy=get_jwt_strategy_dep,
)

router = APIRouter()
router.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)

router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate), prefix="/auth", tags=["auth"]
)
router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate), prefix="/users", tags=["users"]
)