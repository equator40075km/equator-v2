from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config import settings
from src.core.database import engine
from src.core.smtp import smtp_client
from src.initial_data import init_database
from src.auth.router import router as auth_router
from src.users.router import router as user_router
from src.articles.router import router as article_router
from src.tours.router import router as tour_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await smtp_client.connect()
    await init_database()
    yield
    # shutdown
    await smtp_client.quit()
    await engine.dispose()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://novchinnikov.ru.tuna.am"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix=settings.api_prefix, tags=['Аутентификация'])
app.include_router(article_router, prefix=settings.api_prefix, tags=['Статьи'])
app.include_router(user_router, prefix=settings.api_prefix, tags=['Пользователи'])
app.include_router(tour_router, prefix=settings.api_prefix, tags=['Туры'])
