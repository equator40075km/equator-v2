from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.dao import BaseDAO
from src.tours.dates.models import TourDatesORM, TourDatesAssociationORM


class TourDatesDAO(BaseDAO):
    model = TourDatesORM

    @classmethod
    async def get_tour_dates(cls, session: AsyncSession) -> list[TourDatesORM]:
        results = await session.execute(select(TourDatesORM).order_by(TourDatesORM.start))
        return list(results.scalars().all())


class TourDatesAssociationDAO(BaseDAO):
    model = TourDatesAssociationORM

    @staticmethod
    async def add_date_to_tour(session: AsyncSession, tour_id: int, date_id: int) -> TourDatesAssociationORM:
        instance = TourDatesAssociationORM(tour_id=tour_id, date_id=date_id)
        session.add(instance)
        await session.commit()
        return instance

    @classmethod
    async def delete_date_from_tour(cls, session: AsyncSession, tour_id: int, date_id: int) -> bool:
        await session.execute(text(
            f"DELETE FROM {cls.model.__tablename__} WHERE tour_id = {tour_id} AND date_id = {date_id};"
        ))
        await session.commit()
        return True
