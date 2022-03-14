from flask import request
from flask_restplus import Resource

from app.main.service.auth_helper import Auth
from app.main.dto.auth import AuthDto
from ..util.decorators import token_required
LOGIN_ENDPOINT="/login"
LOGOUT_ENDPOINT= "/logout"
CHECK_TOKEN="/checkToken"


api = AuthDto.api
auth_dto = AuthDto.auth

@api.route(LOGIN_ENDPOINT)
class UserLogin(Resource):
    """
        User Login Resource
    """
    @api.doc('user login')
    @api.expect(auth_dto, validate=True)
    def post(self):
        # get the post data
        post_data = request.json
        return Auth.login_user(data=post_data)


@api.route(LOGOUT_ENDPOINT)
class LogoutAPI(Resource):
    """
    Logout Resource
    """
    @api.doc('logout a user')
    def post(self):
        # get auth token
        return Auth.logout_user(request)
        # return Auth.log_out_user()

@api.route(CHECK_TOKEN)
class User(Resource):
    @api.doc('check the user token for private route')
    @token_required
    def get(self):
        return {}, 200