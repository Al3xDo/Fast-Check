from app.main import db
from app.main.model.blacklist import BlacklistToken
from app.main.service import config

def save_token(token):
    blacklist_token = BlacklistToken(token=token)
    try:
        # insert the token
        db.session.add(blacklist_token)
        db.session.commit()
        response_object = {
            config.STATUS: config.STATUS_SUCCESS,
            config.MESSAGE: config.MSG_LOG_OUT_SUCCESSFULLY
        }
        return response_object, config.STATUS_CODE_SUCCESS
    except Exception as e:
        response_object = {
            config.STATUS: config.STATUS_FAIL,
            config.MESSAGE: e
        }
        return response_object, config.STATUS_CODE_SUCCESS
