from app.main.model.user import User
from ..service.blacklist_service import save_token
from app.main.service import config

from app.main.util import utils_response_object
class Auth:
    @staticmethod
    def login_user(data):
        try:
            # fetch the user data
            user = User.query.filter_by(email=data.get('email')).first()
            if user and user.check_password(data.get('password')):
                auth_token = user.encode_auth_token(user.id)
                if auth_token:
                    response_object = {
                        config.STATUS: config.STATUS_SUCCESS,
                        config.MESSAGE: 'Successfully logged in.',
                        'token': auth_token.decode()
                    }
                    return response_object, config.STATUS_CODE_SUCCESS
            else:
                response_object = {
                    config.STATUS: config.STATUS_FAIL,
                    config.MESSAGE: config.MSG_INFO_NOT_MATCH
                }
                return response_object, config.STATUS_CODE_NOT_FOUND

        except Exception as e:
            response_object = {
                config.STATUS: config.STATUS_FAIL,
                config.MESSAGE: config.MSG_INTERNAL_ERROR
            }
            return response_object, config.MSG_INTERNAL_ERROR

    @staticmethod
    def logout_user(new_request):
        data = new_request.headers.get('Authorization')
        auth_token = str.replace(str(data), 'Bearer ', '')
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if resp.count("-") >0:
                # mark the token as blacklisted
                return save_token(token=auth_token)
            else:
                return utils_response_object.send_response_object_NOT_ACCEPTABLE(resp)
        else:
            return utils_response_object.send_response_object_NOT_ACCEPTABLE(config.MSG_NOT_VALID_TOKEN)

    @staticmethod
    def get_logged_in_user(new_request):
        # get the auth token
        data = new_request.headers.get('Authorization')
        auth_token = str.replace(str(data), 'Bearer ', '')
        if auth_token != 'None':
            resp = User.decode_auth_token(auth_token)
            user = User.query.filter_by(id=resp).first()
            # check if resp is token
            if user:
                return utils_response_object.send_response_object_SUCCESS("")
                # except exc.NoResultFound as e:
                #     response_object= {
                #         config.STATUS: config.STATUS_FAIL,
                #         config.MESSAGE: config.MSG_USER_NOT_FOUND
                #     }
            return utils_response_object.send_response_object_UNAUTHORIZED(config.MSG_NOT_VALID_TOKEN)
        else:
            return utils_response_object.send_response_object_UNAUTHORIZED(config.MSG_NOT_VALID_TOKEN)
    # def log_out_user():
        # return save_token(token=auth_token)
        # return send_response_object_SUCCESS(config.MSG_LOG_OUT_SUCCESSFULLY)
