import os
import unittest

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from app.main import create_app,db
from app.main.model import user
from app.main.model import room
from app.main.model import blacklist
from app.main.model import participants
from app import blueprint
import os


app= create_app(os.getenv("API_ENV") or "dev")
print(os.getenv("API_ENV"))
app.register_blueprint(blueprint)
app.app_context().push()
manager = Manager(app)
migrate = Migrate().init_app(app, db)
manager.add_command('db', MigrateCommand)


@manager.command
def run():
    app.run(host='0.0.0.0',port=3001,threaded=True)
@manager.command
def test():
    """Runs the unit tests."""
    tests = unittest.TestLoader().discover('./app/test', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1
if __name__ == '__main__':
    manager.run()