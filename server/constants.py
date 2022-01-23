# api constants
PREFIX_USER_ENDPOINT="/user"
PREFIX_ROOM_ENDPOINT="/room"
PREFIX_AUTH_ENDPOINT="/auth"
# auth_controller
LOGIN_ENDPOINT="/login"
LOGOUT_ENDPOINT= "/logout"
# room_controller
ROOMS_ENDPOINT="/rooms"
ROOM_ENDPOINT="/room"
CREATE_ROOM_ENDPOINT="/create"
SIGNOUT_ENDPOINT="/signout"
# user_controller
SIGNUP_ENDPOINT="/signup"
USER_ENDPOINT="/user"
UPLOAD_IMAGE="/uploadImage"
CHECK_TOKEN= "/checkToken"


MAX_NAME_LENGTH = 50
MIN_PASSWORD_LENGTH = 8


ACCESS_TOKEN_EXPIRES_DAYS = 7


STATUS_CODE_SUCCESS = 200
STATUS_CODE_ERROR = 401

# SYSTEM MESSAGE
AUTH_ERROR = "Email or password is invalid"
AUTH_SUCCESS = "Login successfully"
SIGNUP_SUCCESS = "Signed Up successfully"
SIGNUP_FAILD = "Signed Up Fail"

MSG_GET_ROOM_SUCCESS = "created room successfully"
MSG_CREATE_ROOM_SUCCESS = "created room successfully"
MSG_ROOM_NOT_EXISTS = "room is not exists"
MSG_ROOM_EXISTS = "room is already exists"
MSG_DELETE_ROOM_SUCCESS = "deleted room successfully"
MSG_UPDATE_ROOM_SUCCESS = "updated room successfully"
MSG_UPDATE_ROOM_FAILD = "updated room faild"
MSG_USER_ISNOT_ADMIN = "user is not admin"
MSG_INTERNAL_ERROR= "Internal Server Error"