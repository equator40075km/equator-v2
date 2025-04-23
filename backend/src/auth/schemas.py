from pydantic import BaseModel, EmailStr


class SToken(BaseModel):
    access_token: str
    token_type: str


class STokenData(BaseModel):
    user_id: int | None = None
    username: str | None = None


class SAuthForm(BaseModel):
    email: EmailStr
    password: str
