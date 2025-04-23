from pydantic import BaseModel


class SArticleLike(BaseModel):
    user_id: int
    article_id: int
