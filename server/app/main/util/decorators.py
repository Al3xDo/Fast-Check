from app.main.service import config
from functools import wraps
from flask import request

from app.main.service.auth_helper import Auth


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):       
        data, status = Auth.get_logged_in_user(request)
        if status != config.STATUS_CODE_SUCCESS:
            return data, status
        return f(*args, **kwargs)

    return decorated

def admin_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
    
        data, status = Auth.get_logged_in_admin_room(request)
        if status != config.STATUS_CODE_SUCCESS:
            return data, status

        return f(*args, **kwargs)

    return decorated