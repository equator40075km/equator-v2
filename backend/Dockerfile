FROM python:3.12-alpine

RUN pip install wait-for-it

WORKDIR /backend

COPY ./requirements.txt /backend/

RUN pip install --no-cache-dir -r requirements.txt

COPY ./alembic.ini /backend/
COPY ./alembic /backend/alembic

COPY ./src /backend/src

COPY ./start.sh /backend
RUN chmod +x /backend/start.sh
