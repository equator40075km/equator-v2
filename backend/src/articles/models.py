from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, relationship, mapped_column

from src.core.models import Base, idpk, created_at, updated_at


class ArticleORM(Base):
    __tablename__ = "articles"

    id: Mapped[idpk]
    title: Mapped[str] = mapped_column(nullable=False)
    preview: Mapped[str] = mapped_column(nullable=False)
    text: Mapped[str] = mapped_column(nullable=False)
    img: Mapped[str] = mapped_column(nullable=False)
    category: Mapped[str] = mapped_column(nullable=False)
    approved: Mapped[bool] = mapped_column(nullable=False, default=False)
    created_at: Mapped[created_at]
    updated_at: Mapped[updated_at]

    author_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    author: Mapped["UserORM"] = relationship(
        back_populates="articles",
        foreign_keys=[author_id],
    )
    liked_by: Mapped[list["UserORM"]] = relationship(
        back_populates="liked_articles",
        secondary="articles_likes_association",
        viewonly=True,
        lazy='raise',
    )
