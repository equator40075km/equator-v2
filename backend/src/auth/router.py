from typing import Annotated
from fastapi import APIRouter, status, Form, Response, HTTPException
from datetime import timedelta, datetime, UTC

from src.auth.dependencies import VerifyEmailTokenDep
from src.auth.service import AuthService
from src.core.dependencies import SessionDep
from src.core.exceptions import UNAUTHORIZED_401, NOT_ACCEPTABLE_406
from src.users.dao import UserDAO
from src.auth.schemas import SAuthForm
from src.users.schemas import SUser, SUserCreate, SUserCreateDB
from src.config import settings
from src.auth.utils import authenticate_user, create_access_token, get_password_hash, get_delete_cookie_args, \
    get_set_cookie_args

router = APIRouter(prefix='/auth')


@router.post('/token', status_code=status.HTTP_200_OK)
async def token(
        session: SessionDep,
        auth_form: Annotated[SAuthForm, Form()],
        response: Response,
):
    user = await UserDAO.get_by_email(session, str(auth_form.email))
    if user.disabled:
        raise NOT_ACCEPTABLE_406
    user = authenticate_user(user, auth_form.password)
    if not user:
        raise UNAUTHORIZED_401
    access_token = create_access_token(data={
        "sub": user.username,
        "user_id": user.id,
    })
    response.set_cookie(**get_set_cookie_args(
        access_token,
        int(timedelta(days=settings.security.access_token_expires_days).total_seconds()),
    ))
    response.status_code = 200
    return response


@router.post('/logout', status_code=status.HTTP_200_OK)
async def logout(
        response: Response,
):
    response.delete_cookie(**get_delete_cookie_args())
    response.status_code = 200
    return response


@router.post('/register', status_code=status.HTTP_201_CREATED)
async def register(
        session: SessionDep,
        user: Annotated[SUserCreate, Form()],
) -> SUser:
    status_code, msg = await AuthService.send_mail_verify_link(str(user.email))
    if status_code != status.HTTP_200_OK:
        raise HTTPException(status_code=status_code, detail=msg)

    res = await UserDAO.create(session, SUserCreateDB(
        username=user.username,
        email=user.email,
        hashed_password=get_password_hash(user.password),
    ))
    return SUser(**res)


@router.post('/verify-email', status_code=status.HTTP_200_OK)
async def verify_email(
        session: SessionDep,
        email: VerifyEmailTokenDep,
):
    result = await UserDAO.enable_user_by_email(session, email)
    if not result:
        raise NOT_ACCEPTABLE_406
    return "Почта подтверждена"
