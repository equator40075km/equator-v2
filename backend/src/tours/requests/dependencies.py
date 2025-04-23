from typing import Annotated
from fastapi import Query, Depends

from src.tours.requests.schemas import STourRequestFilters


def get_tour_requests_filters(
        tour_id: int | None = Query(default=None),
        approved: bool | None = Query(default=None),
) -> STourRequestFilters:
    return STourRequestFilters.model_validate({
        "tour_id": tour_id,
        "approved": approved,
    })


TourRequestFilterDep = Annotated[STourRequestFilters, Depends(get_tour_requests_filters)]
