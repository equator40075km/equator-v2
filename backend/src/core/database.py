from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, create_async_engine, async_sessionmaker

from src.config import settings

engine: AsyncEngine = create_async_engine(
    url=settings.db.url,
    echo=settings.run.debug,
)

session_maker = async_sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False,
)


async def get_session_getter() -> AsyncGenerator[AsyncSession, None]:
    async with session_maker() as session:
        yield session
