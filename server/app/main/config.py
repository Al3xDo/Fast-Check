import os
from dotenv import load_dotenv

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


class ProductionConfig(Config):
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{Config.DB_NAME}:{Config.DB_PASSWORD}@{Config.DB_HOST_PROD_HOST}/fast_check_prod"
    


class DevelopmentConfig(Config):
    DEBUG = True
    FLASK_DEBUG = 1
    # MONGODB_SETTINGS = {
    #     'host': 'mongodb://localhost/cat-check'
    # }
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{Config.DB_NAME}:{Config.DB_PASSWORD}@{Config.DB_HOST}/fast_check"


class TestingConfig(Config):
    TESTING = True
    DEBUG = True
    FLASK_DEBUG=1
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{Config.DB_NAME}:{Config.DB_PASSWORD}@{Config.DB_HOST}/fast_check_test"

class ActionTestingConfig(Config):
    TESTING = True
    DEBUG = True
    FLASK_DEBUG=1
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    # DB_NAME= os.environ.get("DB_NAME")
    # DB_HOST= os.environ.get("DB_HOST")
    # DB_PASSWORD= os.environ.get("DB_PASSWORD")
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