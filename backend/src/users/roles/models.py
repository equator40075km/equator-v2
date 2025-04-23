from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.models import Base, idpk


class UserRoleORM(Base):
    __tablename__ = 'user_roles'

    id: Mapped[idpk]
    identifier: Mapped[str] = mapped_column(unique=True, nullable=False)
    name: Mapped[str] = mapped_column(nullable=False)

    users: Mapped["UserORM"] = relationship(
        back_populates="roles",
        secondary="user_roles_association",
        lazy='raise',
    )


class UserRoleAssociationORM(Base):
    __tablename__ = 'user_roles_association'

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)
    role_id: Mapped[int] = mapped_column(ForeignKey("user_roles.id"), primary_key=True)
