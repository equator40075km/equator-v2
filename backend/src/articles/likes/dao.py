from sqlalchemy import delete
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from src.articles.likes.models import ArticleLikeAssociationORM
from src.articles.likes.schemas import SArticleLike
from src.core.dao import BaseDAO


class ArticleLikeDAO(BaseDAO):
    model = ArticleLikeAssociationORM

    @classmethod
    async def like(cls, session: AsyncSession, article_like: SArticleLike) -> bool:
        try:
            instance = ArticleLikeAssociationORM(**article_like.model_dump())
            session.add(instance)
            await session.commit()
            return True
        except IntegrityError as e:
            await session.rollback()
            if "duplicate key" in str(e):
                return False
            raise


    @classmethod
    async def unlike(cls, session: AsyncSession, article_like: SArticleLike) -> bool:
        await session.execute(
            delete(ArticleLikeAssociationORM)
            .where(ArticleLikeAssociationORM.user_id == article_like.user_id)
            .where(ArticleLikeAssociationORM.article_id == article_like.article_id)
        )
        await session.commit()
        return True
