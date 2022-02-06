from flask import request
from flask_restplus import Resource

from ..util.dto import ParticipantDto
from ..util.decorators import token_required
from ..util.utils import get_JWT_identity
from ..service.participants_service import join_a_room, out_a_room, createAttendance, checkAttendance


OUT_ROOM_ENDPOINT="/out"
JOIN_ROOM_ENDPOINT="/join"
CREATE_ATTENDANCE_ENDPOINT="/create_attendance"
CHECK_ATTENDANCE_ENDPOINT="/check_attendance"



api = ParticipantDto.api
# _room = RoomDto.room

@api.route(OUT_ROOM_ENDPOINT+'/<id>')
class Room(Resource):
    @api.doc('out a room')
    @token_required
    def get(self, id):
        userId= get_JWT_identity(request)
        print(userId)
        return out_a_room(userId, id)

@api.route(JOIN_ROOM_ENDPOINT+'/<id>')
class Room(Resource):
    @api.doc('join a room')
    @token_required
    def get(self, id):
        userId= get_JWT_identity(request)
        return join_a_room(userId, id)

@api.route(CREATE_ATTENDANCE_ENDPOINT+'/<id>')
class Room(Resource):
    @api.doc('create attendance')
    @token_required
    def post(self, id):
        userId= get_JWT_identity(request)
        data= request.json
        return join_a_room(userId, id)
@api.route(CHECK_ATTENDANCE_ENDPOINT+'/<id>')
class Room(Resource):
    @api.doc('check attendance')
    @token_required
    def post(self, id):
        userId= get_JWT_identity(request)
        return join_a_room(userId, id)
