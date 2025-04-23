import jwt
from typing import Annotated
from fastapi import Cookie, Depends, Query

from src.auth.schemas import STokenData
from src.config import settings
from src.core.exceptions import UNAUTHORIZED_401


def get_token_data(
    access_token: Annotated[str | None, Cookie()] = None,
) -> STokenData:
    if access_token is None:
        raise UNAUTHORIZED_401

    try:
        payload = jwt.decode(
            access_token,
            settings.security.jwt_secret_key,
            algorithms=[settings.security.jwt_algorithm]
        )
        username = payload.get("sub")
        if username is None:
            raise UNAUTHORIZED_401
        token_data = STokenData(
            username=username,
            user_id=int(payload.get("user_id")),
        )
        return token_data
    except jwt.InvalidTokenError:
        raise UNAUTHORIZED_401


TokenDep = Annotated[STokenData, Depends(get_token_data)]


def get_verify_token_email(
        verify_token: str = Query(min_length=10),
) -> str:
    try:
        payload = jwt.decode(
            verify_token,
            settings.security.jwt_secret_key,
            algorithms=[settings.security.jwt_algorithm]
        )
        email = payload.get("sub")
        if email is None:
            raise UNAUTHORIZED_401
        return email
    except jwt.InvalidTokenError as e:
        print(f"VERIFY TOKEN ERROR:\n{e}")
        raise UNAUTHORIZED_401


VerifyEmailTokenDep = Annotated[str, Depends(get_verify_token_email)]
