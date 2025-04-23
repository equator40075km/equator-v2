from aiosmtplib import SMTP

from src.config import settings

smtp_client = SMTP(
    hostname=settings.smtp.host,
    port=settings.smtp.port,
    username=settings.smtp.email,
    password=settings.smtp.password,
    use_tls=True,
)
