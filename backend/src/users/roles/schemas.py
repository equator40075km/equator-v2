from pydantic import BaseModel


class SRole(BaseModel):
    id: int
    identifier: str
    name: str
