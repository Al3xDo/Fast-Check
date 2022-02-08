from flask_restplus import Namespace, fields


class UserDto:
    api = Namespace('user', description='user related operations')
    user = api.model('user', {
        'email': fields.String(required=True, description='user email address'),
        'name': fields.String(description='user username'),
        'password': fields.String(required=True, description='user password'),
        'avatar': fields.String(description='user avatar')
    })


class RoomDto:
    api = Namespace('room', description='room related operations')
    room = api.model('room', {
        'roomName': fields.String(required=True, description='room name'),
        'dateSchedule': fields.String( description='schedule end time'),
        'timeSchedule': fields.String( description='schedule start time'),
        'code': fields.String( description='room code'),
        'password': fields.String( description='room password'),
    })

class ParticipantDto:
    api = Namespace('participants', description='room related operations')
    room = api.model('participants', {
        'dateJoined': fields.String(description='date joined'),
        'userId': fields.String(required=True, description='user id'),
        'roomId': fields.String(required=True, description='room id'),
        'idAdmin': fields.Boolean(description='is admin')
    })

class AuthDto:
    api = Namespace('auth', description='authentication related operations')
    user_auth = api.model('auth_details', {
        'email': fields.String(required=True, description='The email address'),
        'password': fields.String(required=True, description='The user password '),
    })