from sqlalchemy import select, func, desc, text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.core.dao import BaseDAO
from src.articles.models import ArticleORM
from src.core.pagination import SPagination
from src.articles.likes.models import ArticleLikeAssociationORM


class ArticleDAO(BaseDAO):
    model = ArticleORM

    @classmethod
    async def get_all(cls, session: AsyncSession, pagination: SPagination) -> tuple[list[ArticleORM], int]:
        query = (
            select(ArticleORM)
            .where(ArticleORM.approved == True)
            .offset(pagination.offset())
            .limit(pagination.page_size)
        )
        total_articles = await session.scalar(select(func.count(ArticleORM.id)).where(ArticleORM.approved == True))
        result = await session.execute(query)
        articles = list(result.unique().scalars().all())
        return articles, total_articles

    @classmethod
    async def get_unapproved_articles(cls, session: AsyncSession) -> list[ArticleORM]:
        results = await session.execute(
            select(ArticleORM)
            .options(joinedload(ArticleORM.author))
            .where(ArticleORM.approved == False)
        )
        return list(results.unique().scalars().all())

    @classmethod
    async def get_best_articles(cls, session: AsyncSession, limit: int = 6) -> list[ArticleORM]:
        result = await session.execute(
            select(
                ArticleORM,
                select(func.count())
                .where(ArticleLikeAssociationORM.article_id == ArticleORM.id)
                .label('like_count')
            )
            .where(ArticleORM.approved == True)
            .order_by(desc('like_count'))
            .limit(limit)
        )
        return [row[0] for row in result.all()]

    @classmethod
    async def get_detail(cls, session: AsyncSession, article_id: int) -> tuple[ArticleORM, int]:
        result = await session.execute(
            select(
                ArticleORM,
                select(func.count())
                .where(ArticleLikeAssociationORM.article_id == ArticleORM.id)
                .label('like_count')
            )
            .options(
                joinedload(ArticleORM.author)
            )
            .where(ArticleORM.id == article_id)
        )
        row = result.unique().one()
        return row[0], row.like_count

    @classmethod
    async def approve_article(cls, session: AsyncSession, article_id: int) -> bool:
        await session.execute(text(
            f"UPDATE {ArticleORM.__tablename__} SET approved = 'true' WHERE id = {article_id}"
        ))
        await session.commit()
        return True
