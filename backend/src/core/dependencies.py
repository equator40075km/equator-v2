from fastapi import Depends, Query
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.database import get_session_getter
from src.config import settings
from src.core.pagination import SPagination

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.api_prefix}/auth/token")


def get_pagination_params(
        page_size: int = Query(10, ge=1),
        page: int = Query(1, ge=1),
) -> SPagination:
    return SPagination.model_validate({
        "page_size": page_size,
        "page": page,
    })


# TokenDep = Annotated[str, Depends(oauth2_scheme)]
SessionDep = Annotated[AsyncSession, Depends(get_session_getter)]
PaginationDep = Annotated[SPagination, Depends(get_pagination_params)]
