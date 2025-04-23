from fastapi import APIRouter, Path, Query, status

from src.core.dependencies import SessionDep
from src.core.permissions import AdminPermissionDep
from src.tours.dao import TourDAO
from src.tours.dates.dao import TourDatesAssociationDAO
from src.tours.dates.schemas import STourDatesAssociation
from src.tours.schemas import STour, STourUpdate, STourRead, STourCreate
from src.tours.requests.router import router as tour_requests_router
from src.tours.dates.router import router as tour_dates_router

router = APIRouter(prefix='/tours')
router.include_router(tour_requests_router)
router.include_router(tour_dates_router)


@router.get('')
async def get_tours(
        session: SessionDep,
        active: bool | None = Query(default=None),
        limit: int | None = Query(default=None, ge=1),
) -> list[STour]:
    tours = await TourDAO.get_tours(session, active=active, limit=limit)
    return [STour.model_validate(tour) for tour in tours]


@router.post('', status_code=status.HTTP_201_CREATED)
async def create_tour(
        session: SessionDep,
        data: STourCreate,
        _: AdminPermissionDep,
) -> STourRead:
    created_tour = await TourDAO.create(session, data)
    return STourRead.model_validate(created_tour)


@router.patch('/{tour_id}')
async def update_tour(
        session: SessionDep,
        update_data: STourUpdate,
        _: AdminPermissionDep,
        tour_id: int = Path(ge=1),
) -> STourRead:
    updated_tour = await TourDAO.update_by_id(session, tour_id, **update_data.model_dump())
    return STourRead.model_validate(updated_tour)


@router.post('/{tour_id}/dates/{date_id}', status_code=status.HTTP_201_CREATED)
async def add_date_to_tour(
        session: SessionDep,
        _: AdminPermissionDep,
        tour_id: int = Path(ge=1),
        date_id: int = Path(ge=1),
) -> STourDatesAssociation:
    result = await TourDatesAssociationDAO.add_date_to_tour(session, tour_id, date_id)
    return STourDatesAssociation.model_validate(result, from_attributes=True)


@router.delete('/{tour_id}/dates/{date_id}')
async def delete_date_from_tour(
        session: SessionDep,
        _: AdminPermissionDep,
        tour_id: int = Path(ge=1),
        date_id: int = Path(ge=1),
) -> bool:
    return await TourDatesAssociationDAO.delete_date_from_tour(session, tour_id, date_id)
