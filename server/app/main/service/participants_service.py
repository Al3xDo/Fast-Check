from array import array
import os
import cv2
from app.main import db
from app.main.model.participants import Participant,AttendanceHistory, AttendanceStatus
from app.main.model.participants import Participant
from sqlalchemy import exc as exc1
from app.main.service.room_service import Room_Service
from app.main.util import utils_response_object
import datetime
from app.main.service import config
from app.main.model.room import Room
from app.main.model.user import User
from app.main.util.preprocess_datetime import combineTimeAndCurrentDate, getCurrentTime
from sqlalchemy import desc, func
from app.main.util.utils import get_response_image
import uuid
import face_recognition

from app.main.service.user_service import User_Service
class Participant_Service:
    @staticmethod
    def out_a_room(userId, publicId):
        roomId= Room_Service.convertPublicIdToRoomId(publicId)
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
    @staticmethod
    def join_a_room(userId, publicId):
        roomId= Room_Service.convertPublicIdToRoomId(publicId)
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
            return utils_response_object.send_response_object_INTERNAL_ERROR()

    @staticmethod
    def createAttendance(userId,publicId,data):
        roomId=Room_Service.convertPublicIdToRoomId(publicId)
        date_time_start=combineTimeAndCurrentDate(data['timeStart'])
        date_time_end=combineTimeAndCurrentDate(data['timeEnd'])
        checker= Participant.query.filter_by(roomId= roomId, userId=userId).first()
        # if is admin -> create attendance history for all participants in room
        try:
            if checker.isAdmin:
                attendance_history=AttendanceHistory(roomId,date_time_start, date_time_end)
                Participant_Service.create_attendance_status_folder_if_not_exist(attendance_history.id)
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

    @staticmethod
    def get_attendance_status_image_name(user_id:str, attendance_history_id:str) -> str:
        img_dir = config.FILESYSTEM_PATH+config.ATTENDANCE_STATUS_PATH+str(attendance_history_id)+"/" + user_id+".jpg" 
        return img_dir
    @staticmethod
    def create_attendance_status_folder_if_not_exist(attendance_history_id: str) -> None:
        path=config.FILESYSTEM_PATH+config.ATTENDANCE_STATUS_PATH+str(attendance_history_id)+"/"
        if not (os.path.exists(path)):
            os.mkdir(path)

    @staticmethod
    def create_encoding_sample_list(saveFolder,image_names):
        encoding_list=[]
        for i in image_names:
            sample_image= face_recognition.load_image_file(os.path.join(saveFolder,i))
            sample_encoding= face_recognition.face_encodings(sample_image)[0]
            encoding_list.append(sample_encoding)
        return encoding_list
        
    @staticmethod
    def compare_2_face(uploadedImage, sample_encoding_list):
        uploaded_encoding= face_recognition.face_encodings(uploadedImage)[0]
        result= face_recognition.compare_faces(sample_encoding_list, uploaded_encoding)
        return result[0]

    @staticmethod
    def checkAttendance(uploadedImage:array, userId:str,attendanceStatusId:str):
        current_date_time= datetime.datetime.now()
        current_time= getCurrentTime()
        attendance_status= AttendanceStatus.query.filter_by(id=attendanceStatusId).first()
        if not attendance_status:
            return utils_response_object.send_response_object_ERROR(config.MSG_ROOM_NOT_EXISTS + " or " + config.MSG_ROOM_PUBLIC_ID_IS_NOT_VALID)
        attendance_history=AttendanceHistory.query.filter_by(id=attendance_status.attendanceHistoryId).first()
        # try:
        if attendance_status.isPresent:
            return utils_response_object.send_response_object_SUCCESS(config.MSG_ALREADY_HAVE_CHECKED_ATTENDANCE)
        else:
            if attendance_history.timeStart <= current_date_time <= attendance_history.timeEnd:
                saveFolder= User_Service.get_user_img_dir(userId,False)
                if not (os.path.exists(saveFolder)):
                    return utils_response_object.send_response_object_NOT_ACCEPTABLE(config.MSG_NOT_UPLOAD_SAMPLE_IMAGE)
                image_names= os.listdir(saveFolder)
                encodingSampleImgs= Participant_Service.create_encoding_sample_list(saveFolder,image_names)
                if Participant_Service.compare_2_face(uploadedImage, encodingSampleImgs):
                    image_name= Participant_Service.get_attendance_status_image_name(userId, attendance_history.id)
                    cv2.imwrite(image_name,uploadedImage)
                    attendance_status.isPresent= True
                    attendance_status.checkedTime= current_time
                    save_changes(attendance_status)
                    return utils_response_object.send_response_object_CREATED(config.MSG_CHECKED_ATTENDACE_SUCESSFULLY)
                else:
                    return utils_response_object.send_response_object_ACCEPTED(config.MSG_USER_CANT_DETECT_FACE)
            else:
                return utils_response_object.send_response_object_ERROR(config.MSG_TIME_CHECKED_ATTENDACE_OVER_SUCESSFULLY)

    @staticmethod
    def check_user_is_room_admin(room_id, user_id):
        is_admin= db.session.query(Participant.isAdmin).filter(Participant.roomId== room_id, Participant.userId==user_id).first()
        return is_admin[0]

    @staticmethod
    def create_room_report(public_id, user_id):
        room_id= Room_Service.convertPublicIdToRoomId(public_id)
        result=[]
        if (Participant_Service.check_user_is_room_admin(room_id, user_id)):
            query=db.session.query(
            AttendanceHistory.timeStart, AttendanceHistory.timeEnd,
            func.count(AttendanceStatus.isPresent), AttendanceHistory.id
            ).filter(AttendanceHistory.id == AttendanceStatus.attendanceHistoryId,
            AttendanceHistory.roomId== room_id, AttendanceStatus.isPresent ==1).group_by(AttendanceHistory.id).order_by(desc(AttendanceHistory.timeStart)).all()
            for i in query:
                item={
                    'timeStart': str(i[0]),
                    'timeEnd': str(i[1]),
                    'checkedParticipantNumber': str(i[2]),
                    'historyId': str(i[3])
                }
                result.append(item)
        else:
            query=db.session.query(
            AttendanceHistory.timeStart, AttendanceHistory.timeEnd,
            AttendanceStatus.isPresent, AttendanceStatus.checkedTime, AttendanceStatus.id
            ).filter(AttendanceHistory.id == AttendanceStatus.attendanceHistoryId,
            AttendanceHistory.roomId== room_id, AttendanceStatus.userId == user_id).order_by(desc(AttendanceHistory.timeStart)).all()
            for i in query:
                image_title= Participant_Service.get_attendance_status_image_name(user_id, i[4])
                encoded_image= get_response_image(image_title)
                item={
                    'timeStart': str(i[0]),
                    'timeEnd': str(i[1]),
                    'isPresent': True if i[2] == 1 else False,
                    'checkedTime': str(i[3]),
                    'encodedImage': encoded_image
                }
                result.append(item)
        return result, config.STATUS_CODE_SUCCESS
    # add pagination to report
    @staticmethod
    def create_attendance_status_report(attendance_history_id, user_id):
        result=[]
        query= db.session.query(User.email, User.name, AttendanceStatus.isPresent, AttendanceStatus.checkedTime, User.id).filter(
        AttendanceStatus.attendanceHistoryId == attendance_history_id, User.id== AttendanceStatus.userId,
        AttendanceHistory.id == attendance_history_id, User.id != user_id).all()
        result=[]
        for i in query:
            # print(i)
            image_title= Participant_Service.get_attendance_status_image_name(i[4],attendance_history_id)
            encoded_image= get_response_image(image_title)
            sample_folder= User_Service.get_user_img_dir(i[4],False)
            sample_image= os.listdir(sample_folder)[0]
            encoded_sample_image= get_response_image(os.path.join(sample_folder,sample_image))
            item={
                'userEmail': str(i[0]),
                'userName': str(i[1]),
                'isPresent': True if i[2] == 1 else False,
                'checkedTime': str(i[3]),
                'encodedImage': encoded_image,
                'encodedSampleImage': encoded_sample_image,
            }
            result.append(item)
        return result, config.STATUS_CODE_SUCCESS
    @staticmethod
    def get_attendance_status_detail(attendance_status_id, user_id):
        query=db.session.query(AttendanceStatus).filter(AttendanceStatus.userId == user_id, AttendanceStatus.id== attendance_status_id).first()
        if not query:
            return utils_response_object.send_response_object_NOT_ACCEPTABLE(config.MSG_USER_DONT_HAVE_RIGHT)
        # find log image

def save_changes(data):
    db.session.add(data)
    db.session.commit()