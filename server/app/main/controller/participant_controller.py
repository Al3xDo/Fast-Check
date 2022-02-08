from flask import request
from flask_restplus import Resource

from ..util.dto import ParticipantDto
from ..util.decorators import token_required
from ..util.utils import get_JWT_identity
from ..service.participants_service import join_a_room, out_a_room, createAttendance, checkAttendance
import re
import base64
import numpy as np
import cv2
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

@api.route(CREATE_ATTENDANCE_ENDPOINT+'/<publicId>')
class Room(Resource):
    @api.doc('create attendance')
    @token_required
    def post(self, publicId):
        userId= get_JWT_identity(request)
        data= request.json
        return createAttendance(userId, publicId,data)
@api.route(CHECK_ATTENDANCE_ENDPOINT+'/<attendanceStatusId>')
class Room(Resource):
    @api.doc('check attendance')
    @token_required
    def post(self, attendanceStatusId):
        userId = get_JWT_identity(request)
        data = request.json
        image = re.sub('^data:image/.+;base64,', '', data['image'])
        image = np.fromstring(base64.b64decode(image), np.uint8)
        img = cv2.imdecode(image, cv2.IMREAD_COLOR)
        return checkAttendance(img, userId,attendanceStatusId)