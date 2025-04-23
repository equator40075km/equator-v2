from typing import Annotated
from fastapi import APIRouter, Path
from starlette.datastructures import URL

from src.auth.dependencies import TokenDep
from src.config import settings
from src.core.dependencies import SessionDep, PaginationDep
from src.core.exceptions import CONFLICT_409
from src.core.pagination import SPagination, response_with_pagination, SPaginationResponse
from src.core.permissions import AdminPermissionDep
from src.tours.requests.dao import TourRequestDAO
from src.tours.requests.dependencies import TourRequestFilterDep
from src.tours.requests.schemas import STourRequestCreate, STourRequest, STourRequestDB, STourRequestFilters, \
    STourRequestDetail

router = APIRouter(prefix='/requests')


@router.get('')
async def get_user_tour_requests(
        session: SessionDep,
        access_token: TokenDep,
) -> list[STourRequestDetail]:
    results = await TourRequestDAO.get_user_requests(session, access_token.user_id)
    return [STourRequestDetail.model_validate(res) for res in results]


@router.post('')
async def create_tour_request(
        session: SessionDep,
        access_token: TokenDep,
        data: STourRequestCreate,
) -> STourRequestDB:
    has_unapproved_request = await TourRequestDAO.has_unapproved_request(session, access_token.user_id)
    if has_unapproved_request is not None:
        raise CONFLICT_409
    data_with_user_id = STourRequest(**data.model_dump(), user_id=access_token.user_id)
    result = await TourRequestDAO.create(session, data_with_user_id)
    return STourRequestDB.model_validate(result)


@router.get('/all')
async def get_all_tour_request(
        session: SessionDep,
        pagination: PaginationDep,
        filters: TourRequestFilterDep,
        _: AdminPermissionDep,
) -> SPaginationResponse[STourRequestDetail]:
    requests, count = await TourRequestDAO.get_all_requests(session, pagination, filters)
    results = [STourRequestDetail.model_validate(request) for request in requests]
    return response_with_pagination(
        base_url=URL(f"https://{settings.security.domain}{settings.api_prefix}/tours/requests/all"),
        count=count,
        results=results,
        pagination=pagination,
        filters=filters,
    )


@router.delete('/{request_id}')
async def delete_request(
        session: SessionDep,
        request_id: Annotated[int, Path(ge=1)],
        _: AdminPermissionDep,
) -> int:
    return await TourRequestDAO.delete_by_id(session, request_id)


@router.post('/{request_id}/approve')
async def approve_request(
        session: SessionDep,
        request_id: Annotated[int, Path(ge=1)],
        _: AdminPermissionDep,
) -> STourRequestDB:
    return await TourRequestDAO.approve_request(session, request_id)
