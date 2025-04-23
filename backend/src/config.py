from pydantic_settings import BaseSettings
from sqlalchemy import URL


class DatabaseConfig(BaseSettings):
    name: str
    user: str
    password: str
    host: str
    port: int

    @property
    def url(self) -> URL:
        return URL.create(
            drivername='postgresql+asyncpg',
            username=self.user,
            password=self.password,
            host=self.host,
            port=self.port,
            database=self.name
        )

    class Config:
        env_prefix = 'DB_POSTGRES_'


class Security(BaseSettings):
    jwt_secret_key: str
    jwt_algorithm: str
    domain: str = "localhost"
    access_token_expires_days: int
    verify_token_expires_minutes: int
    admin_email: str
    admin_password: str

    class Config:
        env_prefix = 'SECURITY_'


class SMTP(BaseSettings):
    host: str
    port: int
    email: str
    password: str

    class Config:
        env_prefix = 'SMTP_'


class Run(BaseSettings):
    debug: bool


class Settings:
    db: DatabaseConfig = DatabaseConfig()
    security: Security = Security()
    smtp: SMTP = SMTP()
    run: Run = Run()
    api_prefix: str = '/api/v1'


settings = Settings()

if __name__ == "__main__":
    print(settings.db.model_dump())
