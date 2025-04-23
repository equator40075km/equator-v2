from datetime import date
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.models import Base, idpk


class TourDatesORM(Base):
    __tablename__ = "tour_dates"

    id: Mapped[idpk]
    start: Mapped[date] = mapped_column(nullable=False)
    end: Mapped[date] = mapped_column(nullable=False)

    tours: Mapped["TourORM"] = relationship(
        back_populates="dates",
        secondary="tour_dates_association",
        lazy="raise",
    )

    requests: Mapped[list["TourRequestORM"]] = relationship(
        back_populates="date",
        lazy="raise",
    )


class TourDatesAssociationORM(Base):
    __tablename__ = "tour_dates_association"

    tour_id: Mapped[int] = mapped_column(
        ForeignKey("tours.id", ondelete="CASCADE"),
        primary_key=True
    )
    date_id: Mapped[int] = mapped_column(
        ForeignKey("tour_dates.id", ondelete="CASCADE"),
        primary_key=True,
    )
