import os
import uuid

from werkzeug.utils import secure_filename

from app.main import db
from app.main.model.user import User
from app.main.model.participants import AttendanceStatus
from sqlalchemy import exc
from app.main.service import config
from app.main.util import utils_response_object
import numpy as np
from ..util.utils import preprocess_email, preprocess_image, detect_face, get_face_image, get_response_image
import cv2
import face_recognition
FILESYSTEM_PATH="./app/filesystem/"
FACE_IMAGES_PATH="user_face_images/"
IMAGES_PATH="images/"
AVATAR_PATH="user_avatar/"
def save_new_user(data):
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        try:
            new_user = User(
                id=str(uuid.uuid4()),
                email=data['email'],
                password=data['password'],
                name=data['user'].split("@")[0]
            )
        except AttributeError:
            return utils_response_object.write_response_object(config.STATUS_FAIL, config.MSG_JSON_NOT_VALIDATE), config.STATUS_CODE_CONFLICT
        save_changes(new_user)
        return  {
            config.STATUS: config.STATUS_SUCCESS,
            config.MESSAGE: config.MSG_ADD_USER_SUCCESS,
            "token": str(new_user.encode_auth_token(new_user.id))
            }, config.STATUS_CODE_CREATED
    else:
        return utils_response_object.write_response_object(config.STATUS_FAIL, config.MSG_USER_ALREADY_EXIST), config.STATUS_CODE_CONFLICT


def serialize_user(user, encodedImg=None):
    return {
        "email": user.email,
        "name": user.name,
        "avatar": encodedImg
    }


def getUserImgDir(id, isAvatar=True):
    if isAvatar:
        imgDir = FILESYSTEM_PATH+AVATAR_PATH+str(id) +".jpg"
    else:
        imgDir = FILESYSTEM_PATH+FACE_IMAGES_PATH+str(id)+"/"
    return imgDir


def get_a_user(userId):
    user = User.query.filter_by(id=userId).first()
    if user:
        if user.hasAvatar:
            imgDir = getUserImgDir(userId)
            encodedImg = get_response_image(imgDir)
            return serialize_user(user, encodedImg), config.STATUS_CODE_SUCCESS
        else:
            imgDir=FILESYSTEM_PATH+"/"+IMAGES_PATH+"default-image.jpg"
            encodedImg= get_response_image(imgDir)
            return serialize_user(user, encodedImg), config.STATUS_CODE_SUCCESS
    return utils_response_object.write_response_object(config.STATUS_FAIL, config.MSG_USER_NOT_FOUND), config.STATUS_CODE_NOT_FOUND


def update_a_user(data,userId):
    # try:
    print(data)
    updateUser = User.query.filter_by(id=userId).update(data)
    db.session.commit()
    return  utils_response_object.send_response_object_SUCCESS(config.MSG_UPDATE_USER_SUCCESS)
    # except:
    #     return utils_response_object.send_response_object_INTERNAL_ERROR()


def delete_a_user(userId):
    try:
        deleteUser = User.query.filter_by(id=userId).delete()
        db.session.commit()
        return utils_response_object.send_response_object_SUCCESS(config.MSG_DELTED_USER_SUCCESS)
    except:
        return utils_response_object.send_response_object_INTERNAL_ERROR()


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in config.ALLOWED_EXTENSIONS


def upload_image(userId, file, isAvatar=True):
    try:
        user = User.query.filter_by(id=userId).first()
            # filename = secure_filename(file.filename)
        if isAvatar:
            saveDir = getUserImgDir(userId)
            # save to the filesystem
            cv2.imwrite(saveDir, file)
            user.hasAvatar = True
            db.session.commit()
            return utils_response_object.send_response_object_ACCEPTED(config.MSG_UPLOAD_IMAGE_SUCCESS)
        else:
            face_locations= face_recognition.face_locations(file)
            user_face_location= None
            if len(face_locations) >1:
                return utils_response_object.send_response_object_NOT_ACCEPTABLE("Too many face in the sample image")
            print(len(face_locations))
            for face_location in face_locations:
                top, right, bottom, left = face_location
                user_face_location= file[top:bottom, left:right]
            saveFolder = getUserImgDir(userId, False)
            if not os.path.exists(saveFolder):
                os.mkdir(saveFolder)
                cv2.imwrite(saveFolder+"0.jpg", user_face_location)
            imagePaths= os.listdir(saveFolder)
            cv2.imwrite(saveFolder+str(int(imagePaths[-1].split(".jpg")[0]) +1)+".jpg", user_face_location)
            return utils_response_object.send_response_object_CREATED("Upload sample image success")
    except Exception as e:
        print(e)
        return utils_response_object.send_response_object_NOT_ACCEPTABLE(config.MSG_UPLOAD_IMAGE_FAIL)


def save_changes(data):
    db.session.add(data)
    db.session.commit()