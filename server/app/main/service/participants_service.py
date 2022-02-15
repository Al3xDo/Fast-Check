from lib2to3.pgen2.token import AT
import os

import cv2
from app.main import db
from app.main.model.participants import Participant,AttendanceHistory, AttendanceStatus
# from app.main.model.attendance import 
from app.main.model.participants import Participant
from sqlalchemy.orm import exc
from sqlalchemy import exc as exc1
from sqlalchemy import between
from app.main.service.room_service import convertPublicIdToRoomId
from app.main.util import utils_response_object
import datetime
from app.main.service import config
from app.main.model.room import Room
from app.main.model.user import User
from app.main.util.preprocess_datetime import getCurrentDateTime, combineTimeAndCurrentDate
import uuid
import face_recognition

from app.main.service.user_service import getUserImgDir
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

def createAttendance(userId,publicId,data):
    roomId=convertPublicIdToRoomId(publicId)
    date_time_start=combineTimeAndCurrentDate(data['timeStart'])
    date_time_end=combineTimeAndCurrentDate(data['timeEnd'])
    checker= Participant.query.filter_by(roomId= roomId, userId=userId).first()
    # if is admin -> create attendance history for all participants in room
    try:
        if checker.isAdmin:
            attendance_history=AttendanceHistory(roomId,date_time_start, date_time_end)
            save_changes(attendance_history)
            participant_list= Participant.query.filter_by(roomId=roomId).all()
            for participant in participant_list:
                attendance_status= AttendanceStatus(id=str(uuid.uuid4()),userId=participant.userId,attendanceHistoryId= attendance_history.id, isPresent=participant.isAdmin)
                save_changes(attendance_status)
            return utils_response_object.send_response_object_CREATED(config.MSG_CREATE_ATTENDANCE_HISTORY_SUCCESS,{"attendanceHistoryId": attendance_history.id})
        else:
            return utils_response_object.send_response_object_ERROR(config.MSG_CREATE_ATTENDANCE_HISTORY_FAIL)
    except Exception as e:
        print(e)
        return utils_response_object.send_response_object_INTERNAL_ERROR()

def create_encoding_sample_list(saveFolder,image_names):
    encoding_list=[]
    for i in image_names:
        sample_image= face_recognition.load_image_file(os.path.join(saveFolder,i))
        sample_encoding= face_recognition.face_encodings(sample_image)[0]
        encoding_list.append(sample_encoding)
    return encoding_list
def compare_2_face(uploadedImage, sample_encoding_list):
    uploaded_encoding= face_recognition.face_encodings(uploadedImage)[0]
    result= face_recognition.compare_faces(sample_encoding_list, uploaded_encoding)
    return result[0]
def checkAttendance(uploadedImage, userId,attendanceStatusId):
    current_date_time= datetime.datetime.now()
    attendance_status= AttendanceStatus.query.filter_by(id=attendanceStatusId).first()
    if not attendance_status:
        return utils_response_object.send_response_object_ERROR(config.MSG_ROOM_NOT_EXISTS + " or " + config.MSG_ROOM_PUBLIC_ID_IS_NOT_VALID)
    attendance_history=AttendanceHistory.query.filter_by(id=attendance_status.attendanceHistoryId).first()
    # try:
    if attendance_status.isPresent:
        return utils_response_object.send_response_object_SUCCESS(config.MSG_ALREADY_HAVE_CHECKED_ATTENDANCE)
    else:
        if attendance_history.timeStart <= current_date_time <= attendance_history.timeEnd:
            saveFolder= getUserImgDir(userId,False)
            if not (os.path.exists(saveFolder)):
                return utils_response_object.send_response_object_NOT_ACCEPTABLE("you have not uploaded your sample image")
            image_names= os.listdir(saveFolder)
            if (image_names == []):
                return utils_response_object.send_response_object_NOT_ACCEPTABLE("you havew not uploaded your sample image")
            encodingSampleImgs= create_encoding_sample_list(saveFolder,image_names)
            if compare_2_face(uploadedImage, encodingSampleImgs):
                attendance_status.isPresent= True
                save_changes(attendance_status)
                return utils_response_object.send_response_object_CREATED(config.MSG_CHECKED_ATTENDACE_SUCESSFULLY)
            else:
                return utils_response_object.send_response_object_ACCEPTED("your image does not match with sample image")
        else:
            return utils_response_object.send_response_object_ERROR(config.MSG_TIME_CHECKED_ATTENDACE_OVER_SUCESSFULLY)
    # except Exception as e:
    #     print(e)
    #     return utils_response_object.send_response_object_INTERNAL_ERROR()
def save_changes(data):
    db.session.add(data)
    db.session.commit()