import json
import uuid
import datetime
from app.main import db
from app.main.model.room import Room
from app.main.model.user import User
from app.main.model.participants import Participant
from sqlalchemy.orm import exc
from sqlalchemy import exc as sexc
from app.main.service import config
from app.main.util import utils_response_object
from app.main.util.preprocess_datetime import getCurrentDateTime
from sqlalchemy import text

# need a writing log service to tracking the error

class Room_Service:
    @staticmethod
    def save_new_room(data, userId):
        user= User.query.filter_by(id= str(userId)).first()
        if user:
            new_room = Room(
                roomName=data['roomName'],
                id= str(uuid.uuid4()),
                publicId= str(uuid.uuid4().hex)
            )
            new_participant= Participant(userId, new_room.id, datetime.datetime.now().strftime("%d-%m-%Y"), 1)
            save_changes(new_room, new_participant)
            return utils_response_object.send_response_object_CREATED(config.MSG_CREATE_ROOM_SUCCESS)
        else:
            return utils_response_object.send_response_object_INTERNAL_ERROR()
    @staticmethod
    def serialize_room(room, admin_name,isAdmin=None,AttendanceId=None):
        roomDict={
            "id": room.id,
            "roomName": room.roomName,
            "isAdmin": True if isAdmin ==1 else False,
            "publicId": room.publicId,
            "AttendanceId": AttendanceId,
            "adminName":admin_name
        }
        try:
            roomDict["dateSchedule"] = room.dateSchedule
        except:
            pass
        try:
            roomDict["timeSchedule"] = room.timeSchedule
        except:
            pass
        try:
            roomDict["participantNumber"] = room.participantNumber
        except:
            pass
        return roomDict
    @staticmethod
    def get_all_room(userId):
        current_date_time= getCurrentDateTime()
        query= db.engine.execute(text('''
            SELECT room.*, attendanceIds.statusId, participants.isAdmin, attendanceIds.isPresent
            FROM room
            LEFT JOIN (SELECT roomId, attendance_status.id AS statusId, attendance_status.isPresent
                    FROM attendance_history, attendance_status
                    WHERE :current_date_time BETWEEN timeStart AND timeEnd
                    AND attendance_history.id = attendance_status.attendanceHistoryId
                    AND attendance_status.userId = :userId
                    ) AS attendanceIds
            ON attendanceIds.roomId = room.id
            LEFT JOIN participants
            ON participants.roomId = room.id
            WHERE participants.userId=:userId
            '''),{'userId': userId, 'current_date_time': current_date_time})
        item, joinedRooms = {}, []
        for row in query:
            for column, value in row.items():
                # build up the dictionary
                item = {**item, **{column: value}}
            joinedRooms.append(item)
        return joinedRooms


    @staticmethod
    def get_a_room(userId,public_id):
        try:
            room_id= Room_Service.convertPublicIdToRoomId(public_id)
            query= db.session.query(Room, Participant.isAdmin).join(Participant).filter(Participant.userId == userId, Participant.roomId == room_id).first()
            admin_name=Room_Service.get_room_admin_email(room_id)
            return Room_Service.serialize_room(query[0], admin_name,query[1])
        except exc.NoResultFound:
            return utils_response_object.send_response_object_NOT_ACCEPTABLE(config.MSG_ROOM_NOT_EXISTS)

    @staticmethod
    def delete_a_room(userId, id):
        # try:
        # check if user is admin
        # need add transaction
        userRight= db.session.query(Participant).filter_by(userId= userId, roomId= id).first()
        if userRight.isAdmin ==1:
            try:
                # delete participant
                db.session.query(Participant).filter_by(userId= userId, roomId= str(id)).delete()
                # delete room
                db.session.query(Room).filter_by(id= str(id)).delete()
                db.session.commit()
                return utils_response_object.send_response_object_SUCCESS(config.MSG_DELETE_ROOM_SUCCESS)
            except sexc.SQLAlchemyError as e:
                return utils_response_object.send_response_object_INTERNAL_ERROR()
        else:
            return utils_response_object.send_response_object_ERROR(config.MSG_USER_DONT_HAVE_RIGHT)


    @staticmethod
    def update_a_room(userId,data):
        # try:
        # check if user is admin
        query= db.session.query(Participant).filter_by(userId= userId, roomId= data['id']).first()
        if query.isAdmin ==1:
            # remove isAdmin field
            del data['isAdmin']
            # try:
            query= db.session.query(Room).filter_by(id= str(data['id'])).update(dict(data))
            db.session.commit()
            return utils_response_object.send_response_object_SUCCESS(config.MSG_UPDATE_ROOM_SUCCESS)
            # except sexc.SQLAlchemyError as e:
            #     return utils_response_object.send_response_object_INTERNAL_ERROR()
        else:
            return utils_response_object.send_response_object_ERROR(config.MSG_USER_DONT_HAVE_RIGHT)

    @staticmethod
    def convertPublicIdToRoomId(publicId):
        try:
            room= Room.query.filter_by(publicId=publicId).first()
            return room.id
        except:
            return None

    @staticmethod
    def get_room_admin_email(room_id):
        admin_name= db.session.query(User.email).join(Participant).filter(Participant.userId == User.id, Participant.roomId== room_id, Participant.isAdmin==1).first()
        return admin_name


def save_changes(room, participant):
    db.session.add(room)
    db.session.add(participant)
    db.session.commit()