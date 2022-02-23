import os
import unittest

from flask import current_app
from flask_testing import TestCase

from manage import app

load_dotenv()
DEBUG = False
TESTING = False
SECRET_KEY = os.getenv('SECRET_KEY')
DB_NAME=os.getenv('DB_NAME')
DB_PASSWORD=os.getenv('DB_PASSWORD')
DB_HOST=os.getenv('DB_HOST')
DB_HOST_TEST_HOST=os.getenv('DB_TEST_HOST')
DB_DOCKER_HOST=os.getenv('DB_DOCKER_HOST')
class TestDevelopmentConfig(TestCase):
    def create_app(self):
        app.config.from_object('app.main.config.DevelopmentConfig')
        return app

    def test_app_is_development(self):
        # self.assertFalse(app.config['SECRET_KEY'] is 'my_precious')
        self.assertTrue(app.config['DEBUG'] is True)
        self.assertFalse(current_app is None)
        self.assertTrue(
            app.config['SQLALCHEMY_DATABASE_URI'] == f"mysql+pymysql://{app.config['SQLALCHEMY_NAME']}:{app.config['SQLALCHEMY_PASSWORD']}@{app.config['SQLALCHEMY_HOST']}/fast_check"
        )


class TestTestingConfig(TestCase):
    def create_app(self):
        app.config.from_object('app.main.config.TestingConfig')
        return app

    def test_app_is_testing(self):
        self.assertTrue(app.config['DEBUG'])

class TestActionTestingConfig(TestCase):
    def create_app(self):
        app.config.from_object('app.main.config.ActionTestingConfig')
        return app

    def test_app_is_testing(self):
        self.assertTrue(app.config['DEBUG'])


class TestProductionConfig(TestCase):
    def create_app(self):
        app.config.from_object('app.main.config.ProductionConfig')
        return app

    def test_app_is_production(self):
        self.assertTrue(app.config['DEBUG'] is False)

class TestDockerProductionConfig(TestCase):
    def create_app(self):
        app.config.from_object('app.main.config.DockerProductionConfig')
        return app

    def test_app_is_production(self):
        self.assertTrue(app.config['DEBUG'] is False)


if __name__ == '__main__':
    unittest.main()