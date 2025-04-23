from typing import Annotated
from fastapi import APIRouter, Path, Response

from src.articles.likes.dao import ArticleLikeDAO
from src.articles.likes.schemas import SArticleLike
from src.core.dependencies import SessionDep
from src.auth.dependencies import TokenDep

router = APIRouter(prefix='/{article_id}/like')


@router.post('')
async def like_article(
        session: SessionDep,
        article_id: Annotated[int, Path(ge=1)],
        token_data: TokenDep,
) -> Response:
    article_like = SArticleLike.model_validate({
        "user_id": token_data.user_id,
        "article_id": article_id,
    })
    res = await ArticleLikeDAO.like(session, article_like)
    return Response(status_code=201) if res else Response(status_code=200)


@router.delete('')
async def unlike_article(
        session: SessionDep,
        article_id: Annotated[int, Path(ge=1)],
        token_data: TokenDep,
) -> Response:
    article_like = SArticleLike.model_validate({
        "user_id": token_data.user_id,
        "article_id": article_id,
    })
    await ArticleLikeDAO.unlike(session, article_like)
    return Response(status_code=200)
