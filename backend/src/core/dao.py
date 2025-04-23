from pydantic import BaseModel
from sqlalchemy import delete, Sequence, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.exceptions import CONFLICT_409


class BaseDAO:
    model = None

    @classmethod
    async def get_by_id(cls, session: AsyncSession, _id: int):
        stmt = select(cls.model).where(cls.model.id == _id)  # type: ignore
        return (await session.scalars(stmt)).unique().one_or_none()

    @classmethod
    async def create(cls, session: AsyncSession, data: BaseModel) -> dict | None:
        try:
            instance = cls.model(**data.model_dump())
            session.add(instance)
            await session.commit()
            return instance.__dict__
        except IntegrityError as e:
            await session.rollback()
            if "duplicate key" in str(e):
                raise CONFLICT_409
            return None

    @classmethod
    async def update_by_id(cls, session: AsyncSession, _id: int, **kwargs) -> dict | None:
        obj = await cls.get_by_id(session, _id)
        if obj is None:
            return None

        for key, value in kwargs.items():
            if key == 'id' or value is None:
                continue
            setattr(obj, key, value)

        await session.commit()
        return obj.__dict__

    @classmethod
    async def delete_by_id(cls, session: AsyncSession, _id: int) -> int:
        stmt = delete(cls.model).where(cls.model.id == _id)  # type: ignore
        await session.execute(stmt)
        await session.commit()
        return _id
