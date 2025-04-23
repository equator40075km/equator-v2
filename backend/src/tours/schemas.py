from pydantic import BaseModel

from src.tours.dates.schemas import STourDates


class STourCreate(BaseModel):
    title: str
    img: str
    active: bool


class STourRead(STourCreate):
    id: int

    class Config:
        from_attributes = True
        extra = "ignore"


class STour(STourRead):
    dates: list[STourDates]


class STourUpdate(BaseModel):
    title: str | None = None
    img: str | None = None
    active: bool | None = None
