from flask_testing import TestCase
from app.main import db
from manage import app
from sqlalchemy import create_engine

class BaseTestCase(TestCase):
    """ Base Tests """

    def create_app(self):
        app.config.from_object('app.main.config.TestingConfig')
        return app

    def setUp(self):
        url = app.config['SQLALCHEMY_DATABASE_URI']
        engine = create_engine(url)  # connect to server

        create_str = f"CREATE DATABASE IF NOT EXISTS fast_check_test"
        engine.execute(create_str)
        engine.execute("USE fast_check_test;")
        db.create_all()
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()