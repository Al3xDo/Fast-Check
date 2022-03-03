from flask import request
from flask_restplus import Resource
from ..util.dto import UserDto
from ..service.user_service import  User_Service
from ..util.decorators import token_required
from ..util.utils import get_JWT_identity
import re
import base64
import numpy as np
import cv2
# user_controller
SIGNUP_ENDPOINT = "/signup"
USER_ENDPOINT = "/"
UPLOAD_AVATAR = "/uploadAvatar"
UPLOAD_SAMPLE = "/uploadSample"
CHECK_TOKEN = "/checkToken"
PREDICT_IMG = "/predict"
CHECK_IMAGE= "/checkImage"
SHOW_SAMPLE='/showSample'
api = UserDto.api
_user = UserDto.user


@api.route(SIGNUP_ENDPOINT)
@api.response(201, 'User successfully created.')
@api.doc('get a user')
@api.doc('create a new user')
class UserSignUp(Resource):
    # @api.marshal_with(_user)
    # @api.expect(_user, validate=True)
    # @cross_origin(supports_credentials=True)
    def post(self):
        """Creates a new User """
        data = request.json
        return User_Service.save_new_user(data=data)


@api.route(USER_ENDPOINT)
class User(Resource):
    @api.doc('get a user')
    # @api.marshal_with(_user)
    @token_required
    def get(self):
        """get a user given its identifier"""
        user_id = get_JWT_identity(request)
        return User_Service.get_a_user(user_id)

    @api.doc('update a user')
    # @api.marshal_with(_user)
    @token_required
    def put(self):
        """get a user given its identifier"""
        data = request.json
        user_id = get_JWT_identity(request)
        return User_Service.update_a_user(data, user_id)

    @token_required
    def delete(self):
        user_id = get_JWT_identity(request)
        return User_Service.delete_a_user(user_id)


@api.route(UPLOAD_AVATAR)
class User(Resource):
    @api.doc('upload user avatar image')
    @token_required
    def post(self):
        user_id = get_JWT_identity(request)
        file= request.files["image"]
        print(file)
        return User_Service.upload_image(user_id, file)


@api.route(UPLOAD_SAMPLE)
class User(Resource):
    @api.doc('upload sample user image')
    @token_required
    def post(self):
        user_id = get_JWT_identity(request)
        file = re.sub('^data:image/.+;base64,', '', request.form['image'])
        image = np.fromstring(base64.b64decode(file), np.uint8)
        img = cv2.imdecode(image, cv2.IMREAD_COLOR)
        return User_Service.upload_image(user_id, img, isAvatar=False)

@api.route(SHOW_SAMPLE)
class User(Resource):
    @api.doc('show sample user image')
    @token_required
    def get(self):
        user_id= get_JWT_identity(request)
        return User_Service.get_sample_image(user_id)