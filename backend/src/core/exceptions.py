from fastapi import HTTPException, status


UNAUTHORIZED_401 = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

FORBIDDEN_403 = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail="You don't have enough permissions",
)

NOT_FOUND_404 = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="Not found",
)

NOT_ACCEPTABLE_406 = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Not acceptable",
)

CONFLICT_409 = HTTPException(
    status_code=status.HTTP_409_CONFLICT,
    detail="Conflict server state",
)
