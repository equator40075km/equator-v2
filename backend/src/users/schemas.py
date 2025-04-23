from pydantic import BaseModel, Field, EmailStr
from datetime import date

from src.users.roles.schemas import SRole


class SUserCreate(BaseModel):
    username: str = Field(min_length=4)
    email: EmailStr
    password: str = Field(min_length=8)


class SUserCreateDB(BaseModel):
    username: str
    email: EmailStr
    hashed_password: str


class SUserRead(BaseModel):
    id: int
    username: str
    first_name: str | None
    last_name: str | None
    avatar: str | None
    city: str | None

    class Config:
        from_attributes = True
        extra = "ignore"


class SUserReadDetail(SUserRead):
    email: EmailStr
    disabled: bool
    birthday: date | None


class SUser(BaseModel):
    id: int
    username: str
    email: EmailStr
    disabled: bool

    first_name: str | None = None
    last_name: str | None = None
    city: str | None = None
    birthday: date | None = None
    avatar: str | None = None

    roles: list[SRole] | None = None


# TODO: cringe
class SArticleRead(BaseModel):
    id: int
    title: str
    preview: str
    img: str
    category: str
    approved: bool

    class Config:
        from_attributes = True
        extra = "ignore"


class SUserDetail(SUser):
    articles: list[SArticleRead]
    liked_articles: list[SArticleRead]


class SUserPatch(BaseModel):
    last_name: str | None = None
    first_name: str | None = None
    city: str | None = None
    birthday: date | None = None
    avatar: str | None = None


class SUserFilters(BaseModel):
    email: str | None
    disabled: bool | None
    role: str | None


class SUserAdminPatch(BaseModel):
    disabled: bool | None
