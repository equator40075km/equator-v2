from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.dao import BaseDAO
from src.users.roles.models import UserRoleORM, UserRoleAssociationORM


class UserRoleDAO(BaseDAO):
    model = UserRoleORM

    @classmethod
    async def get_roles(cls, session: AsyncSession) -> list[UserRoleORM]:
        results = await session.execute(select(UserRoleORM))
        return list(results.scalars().all())


class UserRoleAssociationDAO:
    @staticmethod
    async def create_role_association(session: AsyncSession, user_id: int, role_id: int) -> bool:
        instance = UserRoleAssociationORM(user_id=user_id, role_id=role_id)
        session.add(instance)
        await session.commit()
        return True

    @staticmethod
    async def delete_role_association(session: AsyncSession, user_id: int, role_id: int) -> bool:
        await session.execute(text(
            f"DELETE FROM {UserRoleAssociationORM.__tablename__} WHERE user_id = {user_id} AND role_id = {role_id};"
        ))
        await session.commit()
        return True
