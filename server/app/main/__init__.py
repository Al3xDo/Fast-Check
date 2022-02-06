from socket import socket
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from .config import config_by_name
from flask_socketio import SocketIO

db= SQLAlchemy()
socketio= SocketIO()
def create_app(config_name):
    app= Flask(__name__)
    # cors = CORS(app)
    # app.config['CORS_HEADERS'] = 'Content-Type'
    CORS(app,resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    socketio.init_app(app, cors_allowed_origins="*")
    app.config.from_object(config_by_name[config_name])
    db.init_app(app)
    Bcrypt().init_app(app)

    return app