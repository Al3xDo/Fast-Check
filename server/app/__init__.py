from flask_restplus import Api
from flask import Blueprint

from .main.controller.user_controller import api as user_ns
from .main.controller.auth_controller import api as auth_ns
from .main.controller.room_controller import api as room_ns
from .main.controller.participant_controller import api as par_ns
blueprint = Blueprint('api', __name__,template_folder='./templates')

api = Api(blueprint,
          title='FLASK RESTPLUS API BOILER-PLATE WITH JWT',
          version='1.0',
          description='a boilerplate for flask restplus web service'
          )

api.add_namespace(user_ns, path='/user')
api.add_namespace(auth_ns, path="/auth")
api.add_namespace(room_ns, path="/room")
api.add_namespace(par_ns, path="/par")