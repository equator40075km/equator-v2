from typing import TypeVar, Generic

from pydantic import BaseModel, Field, HttpUrl
from starlette.datastructures import URL
from src.core.utils import filters_to_query_params


class SPagination(BaseModel):
    page_size: int = Field(default=10, ge=1)
    page: int = Field(default=1, ge=1)

    def offset(self) -> int:
        return (self.page - 1) * self.page_size


T = TypeVar("T")


class SPaginationResponse(BaseModel, Generic[T]):
    count: int
    next: HttpUrl | None
    prev: HttpUrl | None
    results: list[T]


def response_with_pagination(
        base_url: URL,
        count: int,
        results: list,
        pagination: SPagination,
        filters: BaseModel | None = None,
) -> SPaginationResponse:
    if count > pagination.page * pagination.page_size:
        next_url = (f"{base_url}?page={pagination.page + 1}&page_size={pagination.page_size}"
                    f"{filters_to_query_params(filters)}")
    else:
        next_url = None
    if pagination.page > 1:
        prev_url = (f"{base_url}?page={pagination.page - 1}&page_size={pagination.page_size}"
                    f"{filters_to_query_params(filters)}")
    else:
        prev_url = None
    return SPaginationResponse(count=count, next=next_url, prev=prev_url, results=results)
