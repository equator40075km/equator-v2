#! /usr/bin/env sh

wait-for-it --service "db:${DB_POSTGRES_PORT}" --timeout 15 -- alembic upgrade head

if [ "$DEBUG" = "false" ]; then
    exec uvicorn src.main:app --host 0.0.0.0 --port 80
else
    exec uvicorn src.main:app --host 0.0.0.0 --port 80 --reload
fi
