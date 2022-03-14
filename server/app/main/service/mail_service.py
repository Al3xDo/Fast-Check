from flask import render_template
from app.main.tasks.mail_tasks import send_async_email_verification_email

from app.main.service import config
from app.main.model.user import User
class Mail_Service:
    @staticmethod
    def send_async_email(reset_password_id, email):
        fast_check_href= config.FAST_CHECK_HREF
        password_recover_href= config.FAST_CHECK_PASSWORD_RECOVERY_HREF+reset_password_id
        send_async_email_verification_email.delay(subject="Password Recovery by Fast Check!",
                                            recipient=email,
                                            html_body=render_template("auth/password_recovery_user.html", fast_check_href= fast_check_href, password_recover_href= password_recover_href))
    # @staticmethod
    # def send_test_email(user):
    #     href = "/"
    #     thr= Thread(target=send_async_email_verification_email, args=["Password Recovery by Flask Base Api! test","nholkshin008@gmail.com" ])
    #     thr.start()
    #     return thr
