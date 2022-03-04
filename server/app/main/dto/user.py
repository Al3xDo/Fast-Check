from flask_restplus import Namespace, fields


class UserDto:
    api = Namespace('user', description='user related operations')
    create_user = api.model('user', {
        'email': fields.String(required=True, description='user email address'),
        'name': fields.String(description='user username'),
        'password': fields.String(required=True, description='user password'),
        'avatar': fields.String(description='user avatar')
    })
    update_user= api.model('user', {
        'email': fields.String(description='user email address'),
        'name': fields.String(description='user username'),
        'password': fields.String(description='user password'),
        'avatar': fields.String(description='user avatar')
    })
