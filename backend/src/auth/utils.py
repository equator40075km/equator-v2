import jwt
from datetime import timedelta, datetime, UTC
from passlib.context import CryptContext

from src.config import settings
from src.users.models import UserORM

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def verify_password(plain_password, hashed_password) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password) -> str:
    return pwd_context.hash(password)


def authenticate_user(user: UserORM, password: str):
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(UTC) + timedelta(days=settings.security.access_token_expires_days)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.security.jwt_secret_key, algorithm=settings.security.jwt_algorithm)


def create_verify_token(email: str) -> str:
    to_encode = {
        "sub": email,
        "exp": datetime.now(UTC) + timedelta(minutes=settings.security.verify_token_expires_minutes)
    }
    return jwt.encode(to_encode, settings.security.jwt_secret_key, algorithm=settings.security.jwt_algorithm)


def get_set_cookie_args(
        value: str,
        expire: int,
) -> dict:
    return {
        "key": "access_token",
        "value": value,
        "max_age": expire,
        "secure": not settings.run.debug,
        "httponly": True,
        "samesite": "none" if not settings.run.debug else "lax",
        "domain": settings.security.domain,
        "path": settings.api_prefix,
    }


def get_delete_cookie_args() -> dict:
    return {
        "key": "access_token",
        "secure": not settings.run.debug,
        "httponly": True,
        "samesite": "none" if not settings.run.debug else "lax",
        "domain": settings.security.domain,
        "path": settings.api_prefix,
    }
