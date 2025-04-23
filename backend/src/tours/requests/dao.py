from sqlalchemy import select, desc, func, update, asc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from src.core.dao import BaseDAO
from src.core.pagination import SPagination
from src.tours.requests.models import TourRequestORM
from src.tours.requests.schemas import STourRequestFilters


class TourRequestDAO(BaseDAO):
    model = TourRequestORM

    @classmethod
    async def get_user_requests(cls, session: AsyncSession, user_id: int) -> list[TourRequestORM]:
        result = await session.execute(
            select(TourRequestORM)
            .options(
                selectinload(TourRequestORM.user),
                selectinload(TourRequestORM.tour),
                selectinload(TourRequestORM.date),
            )
            .where(TourRequestORM.user_id == user_id)
            .order_by(desc(TourRequestORM.id))
        )
        return list(result.unique().scalars().all())

    @classmethod
    async def has_unapproved_request(cls, session: AsyncSession, user_id: int) -> TourRequestORM | None:
        result = await session.execute(
            select(TourRequestORM)
            .where(TourRequestORM.user_id == user_id)
            .where(TourRequestORM.approved == False)
        )
        return result.one_or_none()

    @classmethod
    async def get_all_requests(
            cls,
            session: AsyncSession,
            pagination: SPagination,
            filters: STourRequestFilters
    ) -> tuple[list[TourRequestORM], int]:
        _filters = filters.model_dump()

        query = select(TourRequestORM)

        for field, value in _filters.items():
            if value is not None:
                query = query.where(getattr(TourRequestORM, field).__eq__(value))

        count_query = select(func.count()).select_from(query.subquery())
        count = (await session.execute(count_query)).scalar_one()

        query = query.options(
            selectinload(TourRequestORM.user),
            selectinload(TourRequestORM.tour),
            selectinload(TourRequestORM.date),
        )
        query = query.order_by(asc(TourRequestORM.approved), desc(TourRequestORM.id))
        query = query.offset(pagination.offset()).limit(pagination.page_size)

        result = await session.execute(query)
        requests = list(result.unique().scalars().all())
        return requests, count

    @classmethod
    async def approve_request(cls, session: AsyncSession, request_id: int):
        result = await session.execute(
            update(TourRequestORM)
            .where(TourRequestORM.id == request_id)
            .values(approved=True)
            .returning(TourRequestORM)
        )
        await session.commit()
        return result.scalars().one_or_none()
