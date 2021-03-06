from datetime import datetime, timedelta
import os
import uuid
from app.main.util.preprocess_datetime import save_datetime_title
from werkzeug.utils import secure_filename
from app.main import db
from app.main.model.user import User
from app.main.service import config
from app.main.util import utils_response_object
from app.main.model.reset_password import ResetPassword
from app.main.util.preprocess_datetime import get_current_date_time
from ..util.utils import get_response_image
import urllib
import cv2
import face_recognition
from app.main.service.config import FILESYSTEM_PATH, FACE_IMAGES_PATH, DEFAULT_AVATAR_PATH, AVATAR_PATH
from .mail_service import Mail_Service
class User_Service:
    @staticmethod
    def save_new_user(data):
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            try:
                new_user = User(
                    id=str(uuid.uuid4()),
                    email=data['email'],
                    password=data['password'],
                    name=data['email'].split("@")[0]
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

    @staticmethod
    def save_new_user_google(data):
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            try:
                new_user = User(
                    id=str(uuid.uuid4()),
                    email=data['email'],
                    name=data['name'],
                    hasAvatar=True,
                    password=str(uuid.uuid4())
                )
                img_dir= User_Service.get_user_img_dir(new_user.id)
                urllib.request.urlretrieve(data['imageUrl'], img_dir)
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


    @staticmethod
    def serialize_user(user, encodedImg=None):
        return {
            "email": user.email,
            "name": user.name,
            "avatar": encodedImg
        }


    @staticmethod
    def get_user_img_dir(id, isAvatar=True):
        if isAvatar:
            imgDir = FILESYSTEM_PATH+AVATAR_PATH+str(id) +".jpg"
        else:
            imgDir = FILESYSTEM_PATH+FACE_IMAGES_PATH+str(id)+"/"
        return imgDir


    @staticmethod
    def get_a_user(userId):
        user = User.query.filter_by(id=userId).first()
        if user:
            if user.hasAvatar:
                imgDir = User_Service.get_user_img_dir(userId)
                encodedImg = get_response_image(imgDir)
                return User_Service.serialize_user(user, encodedImg), config.STATUS_CODE_SUCCESS
            else:
                imgDir=DEFAULT_AVATAR_PATH
                encodedImg= get_response_image(imgDir)
                return User_Service.serialize_user(user, encodedImg), config.STATUS_CODE_SUCCESS
        return utils_response_object.write_response_object(config.STATUS_FAIL, config.MSG_USER_NOT_FOUND), config.STATUS_CODE_NOT_FOUND


    @staticmethod
    def update_a_user(data,userId):
        try:
            User.query.filter_by(id=userId).update(data)
            db.session.commit()
            return  utils_response_object.send_response_object_SUCCESS(config.MSG_UPDATE_USER_SUCCESS)
        except Exception as e:
            return utils_response_object.send_response_object_INTERNAL_ERROR()


    @staticmethod
    def delete_a_user(userId):
        try:
            User.query.filter_by(id=userId).delete()
            db.session.commit()
            return utils_response_object.send_response_object_SUCCESS(config.MSG_DELTED_USER_SUCCESS)
        except:
            return utils_response_object.send_response_object_NOT_ACCEPTABLE(config.MSG_USER_NOT_FOUND)


    @staticmethod
    def allowed_file(filename):
        return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in config.ALLOWED_EXTENSIONS


    @staticmethod
    def upload_image(userId, file, isAvatar=True):
        try:
            user = User.query.filter_by(id=userId).first()
            if isAvatar:
                filename = secure_filename(file.filename)
                # print(file)
                if not User_Service.allowed_file(filename):
                    return utils_response_object.send_response_object_NOT_ACCEPTABLE(config.MSG_FILETYPE_IS_NOT_ALLOWED)
                saveDir = User_Service.get_user_img_dir(userId)
                # save to the filesystem
                file.save(saveDir)
                user.hasAvatar = True
                db.session.commit()
                return utils_response_object.send_response_object_ACCEPTED(config.MSG_UPLOAD_IMAGE_SUCCESS)
            else:
                saveFolder = User_Service.get_user_img_dir(userId, False)
                if not os.path.exists(saveFolder):
                    os.mkdir(saveFolder)
                image_num= len(os.listdir(saveFolder))
                if image_num >=5:
                    return utils_response_object.send_response_object_NOT_ACCEPTABLE(config.MSG_TOO_MUCH_SAMPLE_IMAGE)
                face_locations= face_recognition.face_locations(file)
                # face_locations=[]
                user_face_location= None
                if len(face_locations) >1:
                    return utils_response_object.send_response_object_NOT_ACCEPTABLE(config.MSG_TOO_MUCH_SAMPLE_IMAGE)
                for face_location in face_locations:
                    top, right, bottom, left = face_location
                    user_face_location= file[top:bottom, left:right]
                saveFolder = User_Service.get_user_img_dir(userId, False)
                title= save_datetime_title()
                cv2.imwrite(saveFolder+title+".jpg", user_face_location)
                return utils_response_object.send_response_object_CREATED(config.MSG_UPLOAD_SAMPLE_IMAGE_SUCCESS)
        except Exception as e:
            print(e)
            return utils_response_object.send_response_object_NOT_ACCEPTABLE(config.MSG_UPLOAD_IMAGE_FAIL)
    @staticmethod
    def get_sample_image(id):
        sample_images_path= User_Service.get_user_img_dir(id,False)
        if (not os.path.exists(sample_images_path)):
            return utils_response_object.send_response_object_NOT_ACCEPTABLE("")
        sample_image_folder= os.listdir(User_Service.get_user_img_dir(id, False))
        response_image={}
        for path in sample_image_folder:
            full_path= sample_images_path+ path
            response_image[path]= get_response_image(full_path)
        return response_image, 200
    
    @staticmethod
    def password_recover(data):
        user= User.query.filter_by(email=data['email']).first()
        if user:
            # create password recover instances
            # get the id of instance
            # attach to the email
            current= get_current_date_time()
            reset_password_log= ResetPassword(user_id= user.id, id=str(uuid.uuid4()),created_at= current)
            save_changes(reset_password_log)
            Mail_Service.send_async_email(reset_password_log.id, user.email)
            return utils_response_object.send_response_object_SUCCESS(config.MSG_PASSWORD_RECOVER_MAIL_SENT)
        else:
            return utils_response_object.send_response_object_BAD_REQUEST()
    @staticmethod
    def change_password(recover_id,data):
        # get id
        # check if link expires
        # allow change password
        password_recover_log= ResetPassword.query.filter_by(id=recover_id).first()
        current= get_current_date_time()
        if (current - password_recover_log.created_at >= timedelta(days=1)) or password_recover_log.is_used:
            return utils_response_object.send_response_object_BAD_REQUEST(config.MSG_PASSWORD_RECOVER_LINK_EXPIRES)
        else:
            # password_recover_log.is_used=True
            # save_changes(password_recover_log)
            user= User.query.filter_by(id=password_recover_log.user_id).first()
            # print(user.password)
            user.password=data['newPassword']
            save_changes(user)
            return utils_response_object.send_response_object_SUCCESS(config.MSG_CHANGE_PASSWORD_SUCCESS)
def save_changes(data):
    db.session.add(data)
    db.session.commit()