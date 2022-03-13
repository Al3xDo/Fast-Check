import os
from dotenv import load_dotenv
import logging
load_dotenv()

class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.getenv('SECRET_KEY')
    DB_NAME=os.getenv('DB_NAME')
    DB_PASSWORD=os.getenv('DB_PASSWORD')
    DB_HOST=os.getenv('DB_HOST')
    DB_HOST_PROD_HOST=os.getenv('DB_PROD_HOST')
    DB_DOCKER_HOST=os.getenv('DB_DOCKER_HOST')
    LOGGING_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    LOGGING_LOCATION = 'flask-base.log'
    LOGGING_LEVEL = logging.DEBUG
    print()
    RESULT_BACKEND = os.getenv('RESULT_BACKEND')
    BROKER_URL = os.getenv('BROKER_URL')
    MAIL_SERVER=os.getenv('MAIL_SERVER')
    MAIL_PORT = os.getenv('MAIL_PORT')
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER=os.getenv('MAIL_DEFAULT_SENDER')
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False


class ProductionConfig(Config):
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{Config.DB_NAME}:{Config.DB_PASSWORD}@{Config.DB_HOST_PROD_HOST}/fast_check_prod"
    MAIL_DEBUG=False
    


class DevelopmentConfig(Config):
    DEBUG = True
    FLASK_DEBUG = 1
    # MONGODB_SETTINGS = {
    #     'host': 'mongodb://localhost/cat-check'
    # }
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{Config.DB_NAME}:{Config.DB_PASSWORD}@{Config.DB_HOST}/fast_check"
    MAIL_DEBUG=False


class TestingConfig(Config):
    TESTING = True
    DEBUG = True
    FLASK_DEBUG=1
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://root:root@127.0.0.1/fast_check_test"
    MAIL_DEBUG=False

class ActionTestingConfig(Config):
    TESTING = True
    DEBUG = True
    FLASK_DEBUG=1
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    # DB_NAME= os.environ.get("DB_NAME")
    # DB_HOST= os.environ.get("DB_HOST")
    # DB_PASSWORD= os.environ.get("DB_PASSWORD")
    MAIL_DEBUG=False
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://root:root@127.0.0.1/fast_check_test"

class DockerProductionConfig(Config):
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{Config.DB_NAME}:{Config.DB_PASSWORD}@{Config.DB_DOCKER_HOST}/fast_check_prod"

config_by_name= dict(
    dev= DevelopmentConfig,
    test= TestingConfig,
    prod= ProductionConfig,
    docker_prod= DockerProductionConfig,
    action_test= ActionTestingConfig
)
key= Config.SECRET_KEY