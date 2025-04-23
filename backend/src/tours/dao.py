from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.dao import BaseDAO
from src.tours.models import TourORM


class TourDAO(BaseDAO):
    model = TourORM

    @classmethod
    async def get_tours(
            cls,
            session: AsyncSession,
            active: bool | None,
            limit: int | None = 4
    ) -> list[TourORM]:
        query = select(TourORM)

        if active is not None:
            query = query.where(TourORM.active == active)

        results = await session.execute(
            query
            .limit(limit)
            .order_by(desc(TourORM.id))
        )
        return list(results.unique().scalars().all())
