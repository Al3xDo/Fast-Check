import os
import tensorflow as tf
import uuid

from werkzeug.utils import secure_filename

from app.main import db
from app.main.model.user import User
from app.main.model.participants import AttendanceStatus
from sqlalchemy import exc
from app.main.service import config
from app.main.util import utils_response_object
import grpc
from tensorflow_serving.apis import predict_pb2
from tensorflow_serving.apis import prediction_service_pb2_grpc
# import requests
import numpy as np
from ..util.utils import preprocess_email, preprocess_image, detect_face, get_face_image, get_response_image
from ..util.utils import save_logs_image


def save_new_user(data):
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        try:
            new_user = User(
                id=str(uuid.uuid4()),
                email=data['email'],
                password=data['password']
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


def getUserImgDir(email):
    email = email.split(".com")[0]
    imgDir = config.UPLOAD_FOLDER+"/"+email+".jpg"
    return imgDir


def get_a_user(userId):
    user = User.query.filter_by(id=userId).first()
    if user:
        if user.hasAvatar:
            imgDir = getUserImgDir(user.email)
            encodedImg = get_response_image(imgDir)
            return serialize_user(user, encodedImg), config.STATUS_CODE_SUCCESS
        else:
            return serialize_user(user), config.STATUS_CODE_SUCCESS
    return utils_response_object.write_response_object(config.STATUS_FAIL, config.MSG_USER_NOT_FOUND), config.STATUS_CODE_NOT_FOUND


def update_a_user(data):
    try:
        updateUser = User.query.filter_by(id=data["id"]).update(data)
        db.session.commit()
        return  utils_response_object.send_response_object_SUCCESS(config.MSG_UPDATE_USER_SUCCESS)
    except exc.SQLAlchemyError:
        return utils_response_object.send_response_object_INTERNAL_ERROR()


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


def upload_image(userId, file):
    try:
        user = User.query.filter_by(id=userId).first()
        if file:
            filename = secure_filename(file.filename)
            if allowed_file(filename):
                saveDir = getUserImgDir(user.email)
                # save to the filesystem
                file.save(saveDir)
                # save image dir to database
                user.hasAvatar = True
                db.session.commit()
                return utils_response_object.send_response_object_ACCEPTED(config.MSG_UPLOAD_IMAGE_SUCCESS)
            else:
                return utils_response_object.write_response_object(config.STATUS_FAIL, config.MSG_FILETYPE_IS_NOT_ALLOWED), config.STATUS_CODE_NOT_ACCEPTABLE
        else:
            return utils_response_object.write_response_object(config.STATUS_FAIL, config.MSG_FILE_NOT_EXITS), config.STATUS_CODE_NOT_ACCEPTABLE
    except:
        return utils_response_object.send_response_object_ERROR(config.MSG_UPLOAD_IMAGE_FAIL)


def model_predict_grpc(imageA, userId):
    channel = grpc.insecure_channel(config.MODEL_SERVING_API_GRPC)
    stub = prediction_service_pb2_grpc.PredictionServiceStub(channel)
    email = User.query.filter_by(id=userId).first().email
    email = preprocess_email(email)
    imgA = detect_face(imageA)
    face_image_dir = config.FACES_FOLDER + "/" + email
    imgBList = tf.io.gfile.glob(face_image_dir + "/*.jpg")
    predictions = [0, 0]
    # loop through 5 images to get the avg result, end ig get 3 same labels consecutive
    for imgB_dir in imgBList:
        imgB = get_face_image(imgB_dir)
        try:
            if imgA == None or imgB == None:
                return {config.MESSAGE: config.MSG_USER_CANT_DETECT_FACE}, config.STATUS_FAIL
        except:
            pass
        # save_logs_image(email,imgA, config.LOG_IMAGES_FOLDER)
        imgA = preprocess_image(imgA)
        imgB = preprocess_image(imgB)

        request = predict_pb2.PredictRequest()

        request.model_spec.name = "1"
        request.model_spec.signature_name = "serving_default"

        request.inputs["input_31"].CopyFrom(
            tf.make_tensor_proto(
                imgA,
                dtype=np.float32,
                shape=imgA.shape
            )
        )
        request.inputs["input_32"].CopyFrom(
            tf.make_tensor_proto(
                imgB,
                dtype=np.float32,
                shape=imgB.shape
            )
        )
        try:
            res = stub.Predict(request, 10)
            prediction = res.outputs['dense_13'].float_val[0]
            if prediction[0] == 3 and predictions[1] == 0:
                break
            if prediction == 0:
                prediction[0] += 1
            else:
                prediction[1] += 1
        except Exception as e:
            return utils_response_object.write_response_object_INTERNAL_ERROR(config.STATUS_FAIL, str(e))
    message = ""
    if predictions[0] >= predictions[1]:
        message = config.MSG_USER_VERIFICATION_SUCCESS
    else:
        message = config.MSG_USER_VERIFICATION_FAIL + \
            "\n" + config.MSG_USER_CANT_DETECT_FACE
    return utils_response_object.send_response_object_SUCCESS(message)


def check_attendance_success():
    pass


def check_attendance_fail():
    pass


def save_changes(data):
    db.session.add(data)
    db.session.commit()

# import requests
# def tfserving_request(req_input):  # 1
#     url = config.MODEL_SERVING_API_REST  # 2
#     input_request = {"signature": "serving-default",
#                      "instances": [req_input]}  # 3
#     response = requests.post(url=url, json=input_request)
#     return response


# def model_predict_res(imageA, email):
#     imgA= detect_face(imageA)
#     imgB= get_face_image(email)
#     inputObj= {
#         "input_31": preprocess_image(imgA),
#         "input_32": preprocess_image(imgB)
#     }
#     response = tfserving_request(inputObj)
#     if response.status_code ==200:
#         response_data= json.loads(response.text)['predictions'][0][0]
#         response_object= {
#             config.STATUS: config.STATUS_SUCCESS,
#         }
#         if response_data == 0:
#             response_object[config.MESSAGE]= "the same"
#         else:
#             response_object[config.MESSAGE]= "not the same"
#         return response_object, config.STATUS_CODE_SUCCESS
#     else:
#         response_object= {
#             config.STATUS: config.STATUS_FAIL,
#         }
#         return response_object, config.STATUS_CODE_ERROR
