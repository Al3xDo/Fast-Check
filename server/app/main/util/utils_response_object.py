from app.main.service import config




def write_response_object(status, message):
    response_object= {
            config.STATUS: status,
            config.MESSAGE: message
            }
    return response_object 

def write_response_object_INTERNAL_ERROR():
    response_object= {
            config.STATUS: config.STATUS_FAIL,
            config.MESSAGE: config.MSG_INTERNAL_ERROR
            }
    return response_object
def send_response_object_INTERNAL_ERROR():
    response_object= {
            config.STATUS: config.STATUS_FAIL,
            config.MESSAGE: config.MSG_INTERNAL_ERROR
            }
    return response_object, config.STATUS_CODE_INTERNAL_ERROR

def send_response_object_CREATED(message):
    response_object= {
            config.STATUS: config.STATUS_SUCCESS,
            config.MESSAGE: message
            }
    return response_object, config.STATUS_CODE_CREATED

def send_response_object_ACCEPTED(message):
    response_object= {
            config.STATUS: config.STATUS_SUCCESS,
            config.MESSAGE: message
            }
    return response_object, config.STATUS_CODE_ACCEPTED

def send_response_object_SUCCESS(message):
    response_object= {
            config.STATUS: config.STATUS_SUCCESS,
            config.MESSAGE: message
            }
    return response_object, config.STATUS_CODE_SUCCESS


def send_response_object_ERROR(message):
    response_object= {
            config.STATUS: config.STATUS_FAIL,
            config.MESSAGE: message
            }
    return response_object, config.STATUS_CODE_ERROR