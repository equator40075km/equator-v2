from typing import Annotated
from sqlalchemy import DateTime
from sqlalchemy.orm import DeclarativeBase, mapped_column

from src.core.utils import utcnow


class Base(DeclarativeBase):
    pass


idpk = Annotated[int, mapped_column(primary_key=True, autoincrement=True, nullable=False)]
created_at = Annotated[DateTime, mapped_column(DateTime(timezone=True), default=utcnow)]
updated_at = Annotated[DateTime, mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)]
