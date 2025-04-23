from sqlalchemy import select, update, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from src.core.dao import BaseDAO
from src.core.pagination import SPagination
from src.users.models import UserORM
from src.users.roles.models import UserRoleORM
from src.users.schemas import SUserPatch, SUserFilters, SUser


class UserDAO(BaseDAO):
    model = UserORM

    @classmethod
    async def get_by_username(cls, session: AsyncSession, username: str) -> UserORM | None:
        query = select(UserORM).where(UserORM.username == username)
        return (await session.execute(query)).unique().scalars().one_or_none()

    @classmethod
    async def get_by_email(cls, session: AsyncSession, email: str) -> UserORM | None:
        query = select(UserORM).where(UserORM.email == email)
        return (await session.execute(query)).unique().scalars().one_or_none()

    @classmethod
    async def get_detail_by_id(cls, session: AsyncSession, user_id: int) -> UserORM | None:
        result = await session.execute(
            select(UserORM)
            .options(
                selectinload(UserORM.articles),
                selectinload(UserORM.liked_articles),
            )
            .where(UserORM.id == user_id)
        )
        return result.unique().scalars().one_or_none()

    @classmethod
    async def patch_by_id(cls, session: AsyncSession, user_id: int, data: SUserPatch) -> UserORM | None:
        update_data = data.model_dump(exclude_unset=True)
        result = await session.execute(
            update(UserORM)
            .where(UserORM.id == user_id)
            .values(**update_data)
        )
        if result.rowcount == 0:
            return None
        await session.commit()
        updated_user = await session.execute(select(UserORM).where(UserORM.id == user_id))
        return updated_user.unique().scalars().one_or_none()

    @classmethod
    async def enable_user_by_email(cls, session: AsyncSession, email: str) -> bool:
        result = await session.execute(
            update(UserORM)
            .where(UserORM.email == email)
            .values(disabled=False)
        )
        if result.rowcount == 0:
            return False
        await session.commit()
        return True

    @classmethod
    async def get_users(
            cls,
            session: AsyncSession,
            pagination: SPagination,
            filters: SUserFilters,
    ) -> tuple[list[SUser], int]:
        _filters = filters.model_dump()

        query = select(UserORM).outerjoin(UserORM.roles)

        for field, value in _filters.items():
            if value is not None:
                if field == 'role':
                    query = query.where(UserRoleORM.identifier == value)
                else:
                    query = query.where(getattr(UserORM, field).__eq__(value))

        count_query = select(func.count()).select_from(query.subquery())
        count = (await session.execute(count_query)).scalar_one()

        query = query.order_by(UserORM.id).offset(pagination.offset()).limit(pagination.page_size)

        result = await session.execute(query)
        users = list(result.unique().scalars().all())
        return users, count
