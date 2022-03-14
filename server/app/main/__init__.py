from socket import socket
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_mail import Mail
from flask_migrate import Migrate
# from app.main.tasks import mail_tasks
# from app import blueprint
import os
from .config import config_by_name
from celery import Celery
db= SQLAlchemy()
mail= Mail()
# socketio= SocketIO()
def create_app(config_name):
    app= Flask(__name__)
    # cors = CORS(app)
    # app.config['CORS_HEADERS'] = 'Content-Type'
    CORS(app,resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    app.config.from_object(config_by_name[config_name])
    db.init_app(app)
    mail.init_app(app)
    Bcrypt().init_app(app)
    Migrate().init_app(app, db)
    return app

def make_celery(app):
    app = app or create_app()
    celery = Celery(app.name, broker=app.config['BROKER_URL'], include=['app.main.tasks.mail_tasks'], backend=app.config['RESULT_BACKEND'])
    celery.conf.update(app.config)
    TaskBase = celery.Task
    class ContextTask(TaskBase):
        abstract = True
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return TaskBase.__call__(self, *args, **kwargs)
    celery.Task = ContextTask
    return celery

app= create_app(os.getenv("API_ENV") or "dev")
celery= make_celery(app)