from app.main import db
from app.main.model.participants import Participant, AttendanceHistory, AttendanceStatus
from app.main.model.participants import Participant
from sqlalchemy.orm import exc
from sqlalchemy import exc as exc1
from app.main.service.room_service import convertPublicIdToRoomId
from app.main.util import utils_response_object
import datetime
from app.main.service import config
from app.main.model.room import Room

def out_a_room(userId, publicId):
    roomId= convertPublicIdToRoomId(publicId)
    if not roomId:
        return utils_response_object.send_response_object_ERROR(config.MSG_ROOM_NOT_EXISTS + " or " + config.MSG_ROOM_PUBLIC_ID_IS_NOT_VALID)
    try:
        # participant= Participant.query.filter_by(userId=userId, roomId=roomId).first()
        # print(participant)
        participant= Participant.query.filter_by(userId=userId, roomId=roomId).delete()
        room= Room.query.filter_by(id=roomId)
        room.participantNumber-=1
        # if participant not exists
        if participant == 0:
            return utils_response_object.send_response_object_ERROR(config.MSG_YOU_ARE_NOT_IN_ROOM)
        # else
        db.session.commit()
        return utils_response_object.send_response_object_SUCCESS(config.MSG_GET_OUT_ROOM_SUCCESS)
    except exc1.SQLAlchemyError as e:
        print(type(e))
        return utils_response_object.send_response_object_INTERNAL_ERROR()
def join_a_room(userId, publicId):
    roomId= convertPublicIdToRoomId(publicId)
    if not roomId:
        return utils_response_object.send_response_object_ERROR(config.MSG_ROOM_NOT_EXISTS + " or " + config.MSG_ROOM_PUBLIC_ID_IS_NOT_VALID)
    try:
        participant= Participant.query.filter_by(userId= userId, roomId= roomId).first()
        if not participant:
            participant= Participant(userId, roomId,datetime.datetime.now().strftime("%d-%m-%Y"))
            save_changes(participant)
            room= Room.query.filter_by(id=roomId).first()
            room.participantNumber+=1
            try:
                save_changes(room)
            except:
                return utils_response_object.send_response_object_INTERNAL_ERROR()
            return utils_response_object.send_response_object_SUCCESS(config.MSG_JOIN_ROOM_SUCCESS)
        else:
            return utils_response_object.send_response_object_ERROR(config.MSG_ALREADY_JOINED_IN)
    except exc1.SQLAlchemyError as e:
        print(type(e))
        return utils_response_object.send_response_object_INTERNAL_ERROR()


def checkAttendance(userId):
    pass


def createAttendance(userId,roomId,timeStart, timeEnd):
    checker= Participant.query.filter_by(roomId= roomId, userId=userId).first()
    # if is admin -> create attendance history for all participants in room
    try:
        if checker.isAdmin:
            attendance_history=AttendanceHistory(roomId,date,timeStart, timeEnd)
            save_changes(attendance_history)
            participant_list= Participant.query.filter_by(roomId=roomId).all()
            for participant in participant_list:
                attendance_status= AttendanceStatus(participant.id, attendance_history.id)
                save_changes(attendance_status)
            return utils_response_object.send_response_object_CREATED(config.MSG_CREATE_ATTENDANCE_HISTORY_SUCCESS)
        else:
            return utils_response_object.send_response_object_ERROR(config.MSG_CREATE_ATTENDANCE_HISTORY_FAIL)
    except:
        return utils_response_object.send_response_object_INTERNAL_ERROR()

def checkAttendance(userId, publicId, currentDate, timeStart, timeEnd, currentTime):
    roomId= convertPublicIdToRoomId(publicId)
    if not roomId:
        return utils_response_object.send_response_object_ERROR(config.MSG_ROOM_NOT_EXISTS + " or " + config.MSG_ROOM_PUBLIC_ID_IS_NOT_VALID)
    attendance_histoy=AttendanceHistory.query.filter_by(roomId= roomId, currentTime= currentDate, timeStart=timeStart, timeEnd=timeEnd).first()
    try:
        if attendance_histoy:
            participant= Participant.query.filter_by(userId= userId, roomId=roomId).first()
            attendance_status= AttendanceStatus.query.filter_by(attendanceHistoryId=attendance_histoy.id, participantId= participant.id).first()
            if attendance_status.isPresent:
                return utils_response_object.send_response_object_ERROR(config.MSG_ALREADY_HAVE_CHECKED_ATTENDANCE)
            else:
                if timeStart <= currentTime <= timeEnd:
                    attendance_status.isPresent= True
                    save_changes(attendance_status)
                    return utils_response_object.send_response_object_CREATED(config.MSG_CHECKED_ATTENDACE_SUCESSFULLY)
                else:
                    return utils_response_object.send_response_object_ERROR(config.MSG_TIME_CHECKED_ATTENDACE_OVER_SUCESSFULLY)
    except:
        return utils_response_object.send_response_object_INTERNAL_ERROR()

def save_changes(data):
    db.session.add(data)
    db.session.commit()