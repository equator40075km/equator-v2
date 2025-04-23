from pydantic import BaseModel, Field, HttpUrl
from datetime import datetime

from src.users.schemas import SUserRead


class SArticleCreate(BaseModel):
    title: str = Field(min_length=1)
    preview: str = Field(min_length=1)
    text: str = Field(min_length=255)
    img: HttpUrl
    category: str = Field(min_length=1)


class SArticleCreateWithAuthorDB(SArticleCreate):
    author_id: int
    img: str


class SArticle(SArticleCreateWithAuthorDB):
    id: int
    created_at: datetime
    updated_at: datetime


class SArticleRead(BaseModel):
    id: int
    title: str
    preview: str
    img: str
    category: str

    class Config:
        from_attributes = True
        extra = "ignore"


class SArticleDetailRead(SArticleRead):
    text: str
    author: SUserRead
    created_at: datetime
    updated_at: datetime
    approved: bool


class SArticleDetailReadWLikes(SArticleDetailRead):
    like_count: int
