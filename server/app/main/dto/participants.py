from flask_restplus import Namespace, fields
class ParticipantDto:
    api = Namespace('participants', description='room related operations')
    create_attendance = api.model('participants', {
        'timeStart': fields.String(required=True,description='date joined'),
        'timeEnd': fields.String(required=True, description='user id'),
    })
    check_attendance= api.model('participants', {
        'image':fields.Raw(required=True, description="user uploaded image"),
        'attendanceStatusId': fields.String(required=True, description="attendance status id")
    })
    