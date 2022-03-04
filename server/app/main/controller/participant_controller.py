from flask import request
from flask_restplus import Resource

from ..util.decorators import admin_token_required, token_required
from ..util.utils import get_JWT_identity
from ..service.participants_service import Participant_Service
import re
import base64
import numpy as np
import cv2
from app.main.dto.participants import ParticipantDto


OUT_ROOM_ENDPOINT="/out"
JOIN_ROOM_ENDPOINT="/join"
CREATE_ATTENDANCE_ENDPOINT="/create_attendance"
CHECK_ATTENDANCE_ENDPOINT="/check_attendance"
CREATE_REPORT_ENDPOINT="/report"
CREATE_STATUS_REPORT_ENDPOINT="/report_status"

api = ParticipantDto.api
create_attendance_dto = ParticipantDto.create_attendance
check_attendance_dto = ParticipantDto.check_attendance

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

@api.route(CREATE_ATTENDANCE_ENDPOINT+'/<publicId>')
class Room(Resource):
    @api.doc('create attendance')
    @token_required
    @api.expect(create_attendance_dto, validate=True)
    def post(self, publicId):
        userId= get_JWT_identity(request)
        data= request.json
        return Participant_Service.createAttendance(userId, publicId,data)

@api.route(CHECK_ATTENDANCE_ENDPOINT)
class Room(Resource):
    @api.doc('check attendance')
    @token_required
    @api.expect(check_attendance_dto, validate=True)
    def post(self):
        userId = get_JWT_identity(request)
        data = request.json
        image = re.sub('^data:image/.+;base64,', '', data['image'])
        image = np.fromstring(base64.b64decode(image), np.uint8)
        img = cv2.imdecode(image, cv2.IMREAD_COLOR)
        attendanceStatusId= data['attendanceStatusId']
        return Participant_Service.checkAttendance(img, userId,attendanceStatusId)

@api.route(CREATE_REPORT_ENDPOINT+'/<id>')
class Room(Resource):
    @api.doc('create report for room')
    @token_required
    def get(self, id):
        user_id= get_JWT_identity(request)
        return Participant_Service.create_room_report(id, user_id)

@api.route(CREATE_STATUS_REPORT_ENDPOINT+'/<attendanceHistoryId>')
class Room(Resource):
    @api.doc('create status report for room')
    @admin_token_required
    def get(self, attendanceHistoryId):
        user_id= get_JWT_identity(request)
        return Participant_Service.create_attendance_status_report(attendanceHistoryId, user_id)