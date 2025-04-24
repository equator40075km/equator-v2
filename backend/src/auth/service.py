import aiosmtplib
from email.mime.text import MIMEText
from fastapi import status

from src.auth.utils import create_verify_token
from src.config import settings
from src.core.smtp import smtp_client


class AuthService:
    @staticmethod
    async def send_mail_verify_link(email: str) -> tuple[int, str]:
        token = create_verify_token(email)

        mime_message = MIMEText(
            f"Для завершения регистрации на сайте EQUATOR перейдите по ссылке:\n\n"
            f"https://{settings.security.domain}/auth/verify-email?token={token}\n\n"
            f"Ссылка будет действительна {settings.security.verify_token_expires_minutes} минут."
        )
        mime_message["From"] = settings.smtp.email
        mime_message["To"] = email
        mime_message["Subject"] = "EQUATOR: завершение регистрации"

        try:
            await smtp_client.send_message(mime_message)
            return status.HTTP_200_OK, "Письмо с инструкцией отправлено на почту"
        except aiosmtplib.SMTPRecipientRefused:
            return status.HTTP_400_BAD_REQUEST, "Не удалось отправить письмо на указанную почту"
        except aiosmtplib.SMTPResponseException as e:
            if e.code == 550:
                return status.HTTP_400_BAD_REQUEST, "Указанной почты не существует"
            raise aiosmtplib.SMTPException
        except aiosmtplib.SMTPException as e:
            print(e)
            return status.HTTP_503_SERVICE_UNAVAILABLE, "Ошибка отправки email"
