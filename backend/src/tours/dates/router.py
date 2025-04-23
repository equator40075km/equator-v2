from fastapi import APIRouter, Path, status

from src.core.dependencies import SessionDep
from src.core.permissions import AdminPermissionDep
from src.tours.dates.dao import TourDatesDAO
from src.tours.dates.schemas import STourDates, STourDatesCreate

router = APIRouter(prefix='/dates')


@router.get('')
async def get_tour_dates(
        session: SessionDep,
        _: AdminPermissionDep,
) -> list[STourDates]:
    dates = await TourDatesDAO.get_tour_dates(session)
    return [STourDates.model_validate(date) for date in dates]


@router.post('', status_code=status.HTTP_201_CREATED)
async def create_tour_date(
        session: SessionDep,
        date: STourDatesCreate,
        _: AdminPermissionDep,
) -> STourDates:
    dates = await TourDatesDAO.create(session, date)
    return STourDates.model_validate(dates)


@router.delete('/{tour_dates_id}')
async def delete_tour_date(
        session: SessionDep,
        _: AdminPermissionDep,
        tour_dates_id: int = Path(ge=1),
) -> int:
    return await TourDatesDAO.delete_by_id(session, tour_dates_id)
