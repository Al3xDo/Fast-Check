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
# need a writing log service to tracking the error


def save_new_room(data, userId):
    user= User.query.filter_by(id= str(userId)).first()
    if user:
        new_room = Room(
            roomName=data['roomName'],
            id= str(uuid.uuid4()),
            publiId= str(uuid.uuid4().hex)
        )
        new_participant= Participant(userId, new_room.id, datetime.datetime.now().strftime("%d-%m-%Y"), 1)
        save_changes(new_room, new_participant)
        return utils_response_object.send_response_object_CREATED(config.MSG_CREATE_ROOM_SUCCESS)
    else:
        return utils_response_object.send_response_object_INTERNAL_ERROR()
def serialize_room(room, isAdmin=None):
    roomDict={
        "id": room.id,
        "roomName": room.roomName,
        "isAdmin": True if isAdmin ==1 else False,
        "publicId": room.publicId
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
def get_all_room(userId):
    query= db.session.query(Room, Participant.isAdmin).join(Participant).filter(Participant.userId == userId).all()
    #convert to dict for json 
    joinedRooms=[]
    for result in query:
        joinedRooms.append(serialize_room(result[0], result[1]))
    return joinedRooms


def get_a_room(userId,id):
    try:
        query= db.session.query(Room).join(Participant).filter(Participant.userId == userId, Participant.roomId == str(id)).first()
        return serialize_room(query)
    except exc.NoResultFound:
        response_object={
            config.STATUS: config.STATUS_FAIL,
            config.MESSAGE: config.MSG_ROOM_NOT_EXISTS
        }
        return response_object, 404

def delete_a_room(userId, id):
    response_object={}
    # try:
    # check if user is admin
    print(userId)
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
def convertPublicIdToRoomId(publicId):
    try:
        room= Room.query.filter_by(publicId=publicId).first()
        return room.id
    except:
        return None
def save_changes(room, participant):
    db.session.add(room)
    db.session.add(participant)
    db.session.commit()