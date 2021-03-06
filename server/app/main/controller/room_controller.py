from flask import request
from flask_restplus import Resource


from app.main.dto.room import RoomDto
from ..service.room_service import  Room_Service
from ..util.decorators import token_required
from ..util.utils import get_JWT_identity
from ..service.participants_service import Participant_Service

# room_controller
ROOMS_ENDPOINT="/rooms"
ROOM_ENDPOINT="/room"
CREATE_ROOM_ENDPOINT="/create"
OUT_ROOM_ENDPOINT="/out"
JOIN_ROOM_ENDPOINT="/join"
# CREATE_REPORT_ENDPOINT="/report"
# CREATE_STATUS_REPORT_ENDPOINT="/report_status"



api = RoomDto.api
room_dto = RoomDto.room


@api.route(ROOMS_ENDPOINT)
class RoomList(Resource):
    @api.doc('list_of_all_created_room')
    # @api.marshal_list_with(_room, envelope='data')
    @token_required
    def get(self):
        userId= get_JWT_identity(request)
        return Room_Service.get_all_room(userId)


@api.route(CREATE_ROOM_ENDPOINT)
class Rooms(Resource):
    @api.response(201, 'Room successfully created.')
    @api.doc('create a new room')
    @api.expect(room_dto, validate=True)
    def post(self):
        """Creates a new Room """
        data = request.json
        userId= get_JWT_identity(request)
        return Room_Service.save_new_room(data, userId)

@api.route('/<id>')
@api.param('id', 'The Room identifier')
@api.response(404, 'Room not found.')
class Room(Resource):
    @api.doc('get a room')
    @token_required
    def get(self, id):
        userId= get_JWT_identity(request)
        return Room_Service.get_a_room(userId, id)

    @api.doc('delete a room')
    @token_required
    def delete(self, id):
        print(request)
        userId= get_JWT_identity(request)
        return Room_Service.delete_a_room(userId, id)
@api.route('/')
@api.response(404, 'Room not found.')
class Room(Resource):
    @api.doc('update a room')
    @token_required
    @api.expect(room_dto, validate=True)
    def put(self):
        data= request.json
        userId= get_JWT_identity(request)
        return Room_Service.update_a_room(userId, data)


@api.route(OUT_ROOM_ENDPOINT+'/<id>')
class Room(Resource):
    @api.doc('out a room')
    @token_required
    def get(self, id):
        userId= get_JWT_identity(request)
        return Participant_Service.out_a_room(userId, id)

@api.route(JOIN_ROOM_ENDPOINT+'/<id>')
class Room(Resource):
    @api.doc('join a room')
    @token_required
    def get(self, id):
        userId= get_JWT_identity(request)
        return Participant_Service.join_a_room(userId, id)