from pydantic import BaseModel
from datetime import date


class STourDatesCreate(BaseModel):
    start: date
    end: date


class STourDates(STourDatesCreate):
    id: int

    class Config:
        from_attributes = True
        extra = "ignore"


class STourDatesAssociation(BaseModel):
    tour_id: int
    date_id: int
