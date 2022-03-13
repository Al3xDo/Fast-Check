from flask_mail import Message
from app.main import celery, mail

@celery.task
def send_async_email_verification_email(subject, recipient, html_body=None):
    msg= Message(subject=subject, recipients=[recipient])
    msg.html= html_body
    mail.send(msg)

@celery.task
def test_task():
    if celery.current_worker_task:
        return 'running in a celery worker'
    return 'just running'