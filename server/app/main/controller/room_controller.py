from flask import request
from flask_restplus import Resource


from ..util.dto import RoomDto
from ..service.room_service import  create_attendance_status_report, create_room_report, get_a_room, get_all_room, save_new_room, update_a_room, delete_a_room
from ..util.decorators import token_required
from ..util.utils import get_JWT_identity
from ..service.participants_service import join_a_room, out_a_room


# room_controller
ROOMS_ENDPOINT="/rooms"
ROOM_ENDPOINT="/room"
CREATE_ROOM_ENDPOINT="/create"
OUT_ROOM_ENDPOINT="/out"
JOIN_ROOM_ENDPOINT="/join"
CREATE_REPORT_ENDPOINT="/report"
CREATE_STATUS_REPORT_ENDPOINT="/report_status"



api = RoomDto.api
_room = RoomDto.room


@api.route(ROOMS_ENDPOINT)
class RoomList(Resource):
    @api.doc('list_of_all_created_room')
    # @api.marshal_list_with(_room, envelope='data')
    @token_required
    def get(self):
        userId= get_JWT_identity(request)
        return get_all_room(userId)


@api.route(CREATE_ROOM_ENDPOINT)
class Rooms(Resource):
    @api.response(201, 'Room successfully created.')
    @api.doc('create a new room')
    @api.expect(_room, validate=True)
    def post(self):
        """Creates a new Room """
        data = request.json
        userId= get_JWT_identity(request)
        return save_new_room(data, userId)


# @api.route("/testToken")
# class testToken(Resource):
#     @token_required
#     def get(self):
#         """Creates a new Room """
#         # return save_new_room(data=data)
#         return {request.json}, 200
# find 
@api.route('/<id>')
@api.param('id', 'The Room identifier')
@api.response(404, 'Room not found.')
class Room(Resource):
    @api.doc('get a room')
    @token_required
    def get(self, id):
        userId= get_JWT_identity(request)
        return get_a_room(userId, id)

    @api.doc('delete a room')
    @token_required
    def delete(self, id):
        print(request)
        userId= get_JWT_identity(request)
        return delete_a_room(userId, id)
@api.route('/')
@api.response(404, 'Room not found.')
class Room(Resource):
    @api.doc('update a room')
    @token_required
    def put(self):
        data= request.json
        userId= get_JWT_identity(request)
        return update_a_room(userId, data)


@api.route(OUT_ROOM_ENDPOINT+'/<id>')
class Room(Resource):
    @api.doc('out a room')
    @token_required
    def get(self, id):
        userId= get_JWT_identity(request)
        return out_a_room(userId, id)

@api.route(JOIN_ROOM_ENDPOINT+'/<id>')
class Room(Resource):
    @api.doc('join a room')
    @token_required
    def get(self, id):
        userId= get_JWT_identity(request)
        return join_a_room(userId, id)

@api.route(CREATE_REPORT_ENDPOINT+'/<id>')
class Room(Resource):
    @api.doc('create report for room')
    @token_required
    def get(self, id):
        user_id= get_JWT_identity(request)
        return create_room_report(id, user_id)
@api.route(CREATE_STATUS_REPORT_ENDPOINT+'/<attendanceHistoryId>')
class Room(Resource):
    @api.doc('create status report for room')
    @token_required
    def get(self, attendanceHistoryId):
        user_id= get_JWT_identity(request)
        return create_attendance_status_report(attendanceHistoryId, user_id)