from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from src.core.models import Base


class ArticleLikeAssociationORM(Base):
    __tablename__ = "articles_likes_association"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        primary_key=True
    )
    article_id: Mapped[int] = mapped_column(
        ForeignKey("articles.id", ondelete="CASCADE"),
        primary_key=True
    )
