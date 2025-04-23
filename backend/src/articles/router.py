from typing import Annotated
from fastapi import APIRouter, Path, Query, HTTPException, status
from starlette.datastructures import URL

from src.articles.schemas import SArticle, SArticleCreate, SArticleCreateWithAuthorDB, SArticleRead, SArticleDetailRead, \
    SArticleDetailReadWLikes
from src.articles.dao import ArticleDAO
from src.auth.dependencies import TokenDep
from src.core.dependencies import SessionDep, PaginationDep
from src.core.pagination import SPagination, response_with_pagination, SPaginationResponse
from src.core.permissions import AuthorPermissionDep, ModeratorPermissionDep
from src.config import settings

from src.articles.likes.router import router as like_router

router = APIRouter(prefix='/articles')
router.include_router(like_router)


@router.get('')
async def get_articles(
        session: SessionDep,
        pagination: PaginationDep,
) -> SPaginationResponse[SArticleRead]:
    articles, count = await ArticleDAO.get_all(session, pagination)
    results = [SArticleRead.model_validate(article) for article in articles]
    return response_with_pagination(
        base_url=URL(f"https://{settings.security.domain}{settings.api_prefix}{router.prefix}"),
        count=count,
        results=results,
        pagination=pagination,
    )


@router.post('')
async def create_article(
        session: SessionDep,
        access_token: TokenDep,
        article: SArticleCreate,
        _: AuthorPermissionDep,
) -> SArticle:
    article_with_author = SArticleCreateWithAuthorDB(
        **article.model_dump(exclude={"img"}),
        author_id=access_token.user_id,
        img=str(article.img),
    )
    res = await ArticleDAO.create(session, article_with_author)
    return SArticle(**res)


@router.delete('')
async def delete_article(
        session: SessionDep,
        article_id: int
):
    return await ArticleDAO.delete_by_id(session, article_id)


@router.get('/best')
async def get_best_articles(
        session: SessionDep,
        limit: int = Query(6, ge=1)
) -> list[SArticleRead]:
    results = await ArticleDAO.get_best_articles(session, limit)
    return [SArticleRead.model_validate(result) for result in results]


@router.get('/unapproved')
async def get_unapproved_articles(
        session: SessionDep,
        _: ModeratorPermissionDep,
) -> list[SArticleDetailRead]:
    results = await ArticleDAO.get_unapproved_articles(session)
    return [SArticleDetailRead.model_validate(result) for result in results]


@router.get('/{article_id}')
async def get_article_by_id(
        session: SessionDep,
        article_id: Annotated[int, Path(ge=1)],
) -> SArticleDetailReadWLikes:
    article, like_count = await ArticleDAO.get_detail(session, article_id)
    if article is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found",
        )
    return SArticleDetailReadWLikes.model_validate({
        **article.__dict__,
        "like_count": like_count,
    })


@router.patch('/{article_id}/approve')
async def approve_article(
        session: SessionDep,
        article_id: Annotated[int, Path(ge=1)],
        _: ModeratorPermissionDep,
):
    return await ArticleDAO.approve_article(session, article_id)
