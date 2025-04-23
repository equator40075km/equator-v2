from typing import Annotated
from fastapi import Depends
from fastapi.params import Query

from src.core.dependencies import SessionDep
from src.auth.dependencies import TokenDep
from src.users.dao import UserDAO
from src.users.models import UserORM
from src.core.exceptions import UNAUTHORIZED_401
from src.users.schemas import SUserFilters


async def get_current_user(
        session: SessionDep,
        token_data: TokenDep,
) -> UserORM:
    user = await UserDAO.get_detail_by_id(session, token_data.user_id)
    if user is None:
        return UNAUTHORIZED_401
    return user


def get_users_filters(
        email: str | None = Query(default=None),
        disabled: bool | None = Query(default=None),
        role: str | None = Query(default=None),
) -> SUserFilters:
    return SUserFilters.model_validate({
        "email": email,
        "disabled": disabled,
        "role": role,
    })


CurrentUserDep = Annotated[UserORM, Depends(get_current_user)]
UsersFiltersDep = Annotated[SUserFilters, Depends(get_users_filters)]
