from typing import Annotated
from fastapi.params import Depends

from src.core.exceptions import FORBIDDEN_403
from src.users.dependencies import CurrentUserDep
from src.users.models import UserORM


def has_role(role_identifier: str):
    async def check_role(user: CurrentUserDep) -> UserORM:
        user_roles = [role.identifier for role in user.roles]
        if "admin" in user_roles:
            return user
        if role_identifier not in user_roles:
            raise FORBIDDEN_403
        return user

    return check_role


AdminPermissionDep = Annotated[UserORM, Depends(has_role("admin"))]
ModeratorPermissionDep = Annotated[UserORM, Depends(has_role("moderator"))]
AuthorPermissionDep = Annotated[UserORM, Depends(has_role("author"))]
