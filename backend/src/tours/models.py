from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.models import Base, idpk


class TourORM(Base):
    __tablename__ = "tours"

    id: Mapped[idpk]
    title: Mapped[str] = mapped_column(unique=True, nullable=False)
    img: Mapped[str] = mapped_column(unique=True, nullable=False)
    active: Mapped[bool] = mapped_column(default=False, nullable=False)

    dates: Mapped[list["TourDatesORM"]] = relationship(
        back_populates="tours",
        secondary="tour_dates_association",
        lazy="joined",
        order_by="TourDatesORM.start",
    )

    requests: Mapped["TourRequestORM"] = relationship(
        back_populates="tour",
        lazy="raise",
    )
