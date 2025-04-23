from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.models import Base, idpk


class TourRequestORM(Base):
    __tablename__ = "tour_requests"

    id: Mapped[idpk]
    contact: Mapped[str] = mapped_column(nullable=False)
    approved: Mapped[bool] = mapped_column(nullable=False, default=False)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    tour_id: Mapped[int] = mapped_column(
        ForeignKey("tours.id", ondelete="CASCADE"),
        nullable=False,
    )
    date_id: Mapped[int] = mapped_column(
        ForeignKey("tour_dates.id", ondelete="CASCADE"),
        nullable=False,
    )

    user: Mapped["UserORM"] = relationship(
        back_populates="tour_requests",
        foreign_keys=[user_id],
        lazy="raise",
    )
    tour: Mapped["TourORM"] = relationship(
        back_populates="requests",
        foreign_keys=[tour_id],
        lazy="raise",
    )
    date: Mapped["TourDatesORM"] = relationship(
        back_populates="requests",
        foreign_keys=[date_id],
        lazy="raise",
    )
