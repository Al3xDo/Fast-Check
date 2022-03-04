from flask_restplus import Namespace, fields

class RoomDto:
    api = Namespace('room', description='room related operations')
    room = api.model('room', {
        'roomName': fields.String(required=True, description='room name'),
        'dateSchedule': fields.String( description='schedule end time'),
        'timeSchedule': fields.String( description='schedule start time'),
        'code': fields.String( description='room code'),
        'password': fields.String( description='room password'),
    })
