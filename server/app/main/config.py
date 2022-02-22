import os
from dotenv import load_dotenv

load_dotenv()

class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_NAME=os.getenv('DB_NAME')
    SQLALCHEMY_PASSWORD=os.getenv('DB_PASSWORD')
    SQLALCHEMY_HOST=os.getenv('DB_HOST')
    SQLALCHEMY_TEST_HOST=os.getenv('DB_TEST_HOST')
class ProductionConfig(Config):
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{Config.SQLALCHEMY_NAME}:{Config.SQLALCHEMY_PASSWORD}@{Config.SQLALCHEMY_HOST}/fast_check"
    


class DevelopmentConfig(Config):
    DEBUG = True
    FLASK_DEBUG = 1
    # MONGODB_SETTINGS = {
    #     'host': 'mongodb://localhost/cat-check'
    # }
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{Config.SQLALCHEMY_NAME}:{Config.SQLALCHEMY_PASSWORD}@{Config.SQLALCHEMY_HOST}/fast_check"


class TestingConfig(Config):
    TESTING = True
    DEBUG = True
    FLASK_DEBUG=1
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{Config.SQLALCHEMY_NAME}:{Config.SQLALCHEMY_PASSWORD}@{Config.SQLALCHEMY_TEST_HOST}/fast_check_test"

config_by_name= dict(
    dev= DevelopmentConfig,
    test= TestingConfig,
    prod= ProductionConfig
)
key= Config.SECRET_KEY