from typing import Annotated
from fastapi import APIRouter, Path
from starlette.datastructures import URL

from src.auth.dependencies import TokenDep
from src.config import settings
from src.core.dependencies import SessionDep, PaginationDep
from src.core.exceptions import NOT_FOUND_404
from src.core.pagination import response_with_pagination, SPaginationResponse
from src.core.permissions import AdminPermissionDep
from src.users.dao import UserDAO
from src.users.dependencies import CurrentUserDep, UsersFiltersDep
from src.users.roles.dao import UserRoleAssociationDAO
from src.users.schemas import SUserDetail, SUserPatch, SUserRead, SUser, SUserAdminPatch, SUserReadDetail

from src.users.roles.router import router as roles_router

router = APIRouter(prefix='/users')
router.include_router(roles_router)


@router.get('')
async def get_users(
        session: SessionDep,
        pagination: PaginationDep,
        filters: UsersFiltersDep,
        _: AdminPermissionDep,
) -> SPaginationResponse[SUser]:
    users, count = await UserDAO.get_users(session, pagination, filters)
    results = [SUser.model_validate(user, from_attributes=True) for user in users]
    return response_with_pagination(
        base_url=URL(f"https://{settings.security.domain}{settings.api_prefix}{router.prefix}"),
        count=count,
        results=results,
        pagination=pagination,
        filters=filters,
    )


@router.get('/me')
async def get_me(
        current_user_detail: CurrentUserDep,
) -> SUserDetail:
    return current_user_detail


@router.patch('/me')
async def update_me(
        session: SessionDep,
        access_token: TokenDep,
        data: SUserPatch,
) -> SUserRead:
    result = await UserDAO.patch_by_id(session, access_token.user_id, data)
    if result is None:
        return NOT_FOUND_404
    return SUserRead.model_validate(result)


@router.patch('/{user_id}')
async def update_user(
        session: SessionDep,
        user_id: Annotated[int, Path(ge=2)],
        data: SUserAdminPatch,
        _: AdminPermissionDep,
) -> SUserReadDetail:
    result = await UserDAO.update_by_id(session, user_id, **data.model_dump(exclude_none=True))
    return SUserReadDetail.model_validate(result)


@router.post('/{user_id}/roles/{role_id}')
async def add_role_to_user(
        session: SessionDep,
        user_id: Annotated[int, Path(ge=2)],
        role_id: Annotated[int, Path(ge=1)],
        _: AdminPermissionDep,
) -> bool:
    return await UserRoleAssociationDAO.create_role_association(session, user_id, role_id)


@router.delete('/{user_id}/roles/{role_id}')
async def add_role_to_user(
        session: SessionDep,
        user_id: Annotated[int, Path(ge=2)],
        role_id: Annotated[int, Path(ge=1)],
        _: AdminPermissionDep,
) -> bool:
    return await UserRoleAssociationDAO.delete_role_association(session, user_id, role_id)
