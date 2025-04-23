from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import date

from src.core.models import Base, idpk, created_at


class UserORM(Base):
    __tablename__ = 'users'

    id: Mapped[idpk]
    username: Mapped[str] = mapped_column(unique=True, nullable=False)
    email: Mapped[str] = mapped_column(unique=True, nullable=False)
    disabled: Mapped[bool] = mapped_column(default=True)
    hashed_password: Mapped[str]
    created_at: Mapped[created_at]

    first_name: Mapped[str | None]
    last_name: Mapped[str | None]
    city: Mapped[str | None]
    birthday: Mapped[date | None]
    avatar: Mapped[str | None]

    roles: Mapped[list["UserRoleORM"]] = relationship(
        back_populates="users",
        secondary="user_roles_association",
        lazy="joined",
    )
    articles: Mapped[list["ArticleORM"]] = relationship(
        back_populates="author",
        lazy="raise",
    )
    liked_articles: Mapped[list["ArticleORM"]] = relationship(
        back_populates="liked_by",
        secondary="articles_likes_association",
        lazy="raise",
    )
    tour_requests: Mapped[list["TourRequestORM"]] = relationship(
        back_populates="user",
        lazy="raise",
    )
