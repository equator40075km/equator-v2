from fastapi import APIRouter

from src.core.dependencies import SessionDep
from src.users.roles.dao import UserRoleDAO
from src.users.roles.schemas import SRole

router = APIRouter(prefix='/roles')


@router.get('')
async def get_roles(session: SessionDep) -> list[SRole]:
    roles = await UserRoleDAO.get_roles(session)
    return [SRole.model_validate(role, from_attributes=True) for role in roles]
