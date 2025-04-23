import os
import sys
from sqlalchemy import select, func, insert, text
from datetime import date

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.config import settings
from src.auth.utils import get_password_hash
from src.core.dependencies import SessionDep

from src.users.models import UserORM
from src.users.roles.models import UserRoleORM, UserRoleAssociationORM
from src.tours.models import TourORM
from src.tours.dates.models import TourDatesORM, TourDatesAssociationORM

roles = [
    {"id": 1, "identifier": "admin", "name": "Админ"},
    {"id": 2, "identifier": "moderator", "name": "Модератор"},
    {"id": 3, "identifier": "author", "name": "Автор"},
]

users = [{
    "id": 1,
    "username": "admin",
    "email": settings.security.admin_email,
    "hashed_password": get_password_hash(settings.security.admin_password),
}]

user_roles = [{"user_id": 1, "role_id": 1}]

tours = [
    {
        "id": 1,
        "title": "Горы Дагестана",
        "img": "https://drive.google.com/thumbnail?sz=w1920&id=1DeUQLpotzl6K2QE50vSsrPQ1pvsNnRT5",
        "active": True,
    },
    {
        "id": 2,
        "title": "Зимний Байкал",
        "img": "https://drive.google.com/thumbnail?sz=w1920&id=1OT3XCsMpfVcyfM1Tdl13GXKRiS7lSCIO",
        "active": True,
    },
    {
        "id": 3,
        "title": "Владивосток",
        "img": "https://drive.google.com/thumbnail?sz=w1920&id=1OjptkeuURNlA24bGA9iAsRNtH8vZegtx",
        "active": True,
    },
    {
        "id": 4,
        "title": "Северная Осетия",
        "img": "https://drive.google.com/thumbnail?sz=w1920&id=124CihWeak57UXdvrRAg2K3SwSY4SVjRa",
        "active": True,
    },
]

tour_dates = [
    {"id": 1, "start": date(2024, 1, 1), "end": date(2024, 1, 5)},
    {"id": 2, "start": date(2024, 2, 1), "end": date(2024, 2, 5)},
]

tour_dates_association = [
    {"tour_id": 1, "date_id": 1},
    {"tour_id": 1, "date_id": 2},
    {"tour_id": 2, "date_id": 1},
    {"tour_id": 2, "date_id": 2},
    {"tour_id": 3, "date_id": 1},
    {"tour_id": 3, "date_id": 2},
    {"tour_id": 4, "date_id": 1},
    {"tour_id": 4, "date_id": 2},
]


class InitialDataCreator:
    def __init__(self, session: SessionDep):
        self.session = session

    async def create_roles(self):
        if await self._count(UserRoleORM) == 0:
            await self.session.execute(insert(UserRoleORM).values(roles))
            await self.session.commit()

            await self._update_sequence(UserRoleORM)

    async def create_admin(self):
        if await self._count(UserORM) == 0:
            await self.session.execute(insert(UserORM).values(users))
            await self.session.execute(insert(UserRoleAssociationORM).values(user_roles))
            await self.session.commit()

            await self._update_sequence(UserORM)

    async def create_tours(self):
        if await self._count(TourORM) == 0:
            await self.session.execute(insert(TourORM).values(tours))
            await self.session.execute(insert(TourDatesORM).values(tour_dates))
            await self.session.execute(insert(TourDatesAssociationORM).values(tour_dates_association))
            await self.session.commit()

            await self._update_sequence(TourORM)
            await self._update_sequence(TourDatesORM)

    async def _count(self, orm_model) -> int:
        result = await self.session.execute(select(func.count(orm_model.id)))
        return result.scalar()

    async def _update_sequence(self, orm_model):
        table = orm_model.__tablename__
        await self.session.execute(text(f"SELECT setval('{table}_id_seq', (SELECT MAX(id) FROM {table}));"))
        await self.session.commit()


async def init_database():
    from src.core.database import session_maker

    async with session_maker() as session:
        creator = InitialDataCreator(session)
        await creator.create_roles()
        await creator.create_admin()
        await creator.create_tours()


if __name__ == '__main__':
    import asyncio
    asyncio.run(init_database())
