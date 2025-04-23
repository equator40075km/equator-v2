from datetime import datetime, UTC
from pydantic import BaseModel


def utcnow():
    return datetime.now(UTC)


def filters_to_query_params(s_filters: BaseModel | None) -> str:
    if s_filters is None:
        return ''
    filters = s_filters.model_dump(exclude_none=True)
    result = ''
    for key, value in filters.items():
        result += f"{key}={value}"
    return result
