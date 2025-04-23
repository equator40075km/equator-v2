from pydantic import BaseModel, Field

from src.tours.dates.schemas import STourDates
from src.tours.schemas import STourRead
from src.users.schemas import SUserReadDetail


class STourRequestCreate(BaseModel):
    contact: str = Field(min_length=11)
    tour_id: int
    date_id: int


class STourRequest(STourRequestCreate):
    user_id: int


class STourRequestDB(STourRequest):
    id: int
    approved: bool


class STourRequestFilters(BaseModel):
    approved: bool | None
    tour_id: int | None


class STourRequestDetail(STourRequestDB):
    user: SUserReadDetail
    tour: STourRead
    date: STourDates

    class Config:
        from_attributes = True
        extra = "ignore"
