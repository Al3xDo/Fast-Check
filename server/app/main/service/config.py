FAST_CHECK_HREF= "http://localhost:3000/"
FAST_CHECK_PASSWORD_RECOVERY_HREF= "http://localhost:3000/recover/"

MAX_NAME_LENGTH = 50
MIN_PASSWORD_LENGTH = 8


ACCESS_TOKEN_EXPIRES_DAYS = 7

FILESYSTEM_PATH="./app/filesystem/"
DEFAULT_AVATAR_PATH="./app/asset/images/default_avatar.jpg"
DEFAULT_NOT_EXIST_PATH="./app/asset/images/not_exist.jpg"
FACE_IMAGES_PATH="user_face_images/"
IMAGES_PATH="images/"
AVATAR_PATH="user_avatar/"
ATTENDANCE_STATUS_PATH="attendance_status/"

STATUS_FAIL = "fail"
STATUS_SUCCESS = "success"
STATUS = "status"
MESSAGE = "message"


STATUS_CODE_SUCCESS = 200
STATUS_CODE_CREATED = 201
STATUS_CODE_ACCEPTED = 202

STATUS_CODE_MOVED_PERMANENTLY = 301
MSG_STATUS_CODE_BAD_REQUEST=400
STATUS_CODE_ERROR = 401
STATUS_CODE_UNAUTHORIZED = 401
STATUS_CODE_FORBIDEN = 403
STATUS_CODE_NOT_FOUND = 404
STATUS_CODE_NOT_ACCEPTABLE = 406
STATUS_CODE_REQUEST_TIME_OUT = 408
STATUS_CODE_CONFLICT = 409

STATUS_CODE_INTERNAL_ERROR = 500

# COMMON
MSG_BAD_REQUEST= "There was an error, Please try again"
# AUTH
AUTH_ERROR = "Email or password is invalid"
AUTH_SUCCESS = "Login successfully"
SIGNUP_SUCCESS = "Signed Up successfully"
SIGNUP_FAILD = "Signed Up Fail"
MSG_PASSWORD_RECOVER_LINK_EXPIRES= "Link is expired, please try again"
MSG_PASSWORD_RECOVER_MAIL_SENT="Password recover link has been sent to your email"
# ROOM
MSG_GET_ROOM_SUCCESS = "created room successfully"
MSG_CREATE_ROOM_SUCCESS = "created room successfully"
MSG_ROOM_NOT_EXISTS = "room is not exists"
MSG_ROOM_EXISTS = "room is already exists"
MSG_DELETE_ROOM_SUCCESS = "deleted room successfully"
MSG_UPDATE_ROOM_SUCCESS = "updated room successfully"
MSG_ROOM_PUBLIC_ID_IS_NOT_VALID = "room public id is not valid"
# USER
MSG_DELTED_USER_SUCCESS = "deleted user successfully"
MSG_UPDATE_USER_SUCCESS = "updated user successfully"
MSG_ADD_USER_SUCCESS = "added user successfully"
MSG_GET_OUT_ROOM_SUCCESS = "get out room successfully"
MSG_JOIN_ROOM_SUCCESS = "join room successfully"
MSG_ALREADY_JOINED_IN = "join room fail, you have already joined in "
MSG_YOU_ARE_NOT_IN_ROOM = "you are not in the room"
MSG_REGISTER_SUCCESS = "registered Successfully "
MSG_UPLOAD_IMAGE_SUCCESS = "upload image Successfully"
MSG_UPLOAD_IMAGE_FAIL = "upload image fail"
MSG_FILE_NOT_EXITS = "File not exist"
MSG_FILETYPE_IS_NOT_ALLOWED = "File type is not allowed, only support png, jpg, jpeg file type, please upload again with correct filetype"
MSG_GET_IMAGE_SUCCESS = "get image successfully"
MSG_USER_ALREADY_EXIST = 'User already exists. Please Log in.',
MSG_USER_VERIFICATION_SUCCESS= "verification success"
MSG_USER_VERIFICATION_FAIL= "verification fail"
MSG_USER_CANT_DETECT_FACE= "can't detect face"
MSG_UPLOAD_SAMPLE_IMAGE_SUCCESS= "Upload sample image success"
MSG_TOO_MUCH_FACE_IN_SAMPLE_IMAGE="Too many face in the sample image"
MSG_CHANGE_PASSWORD_SUCCESS= "Your password has been changed"
# AUTH HELPER
MSG_LOGGED_IN_SUCCESS = "Sucessfully logged in"
MSG_INFO_NOT_MATCH = 'email or password does not match.'
MSG_NOT_VALID_TOKEN = 'Provide a valid auth token.'
MSG_USER_NOT_FOUND = 'Account not found'
# BLACK LIST SERVICE
MSG_LOG_OUT_SUCCESSFULLY = 'Successfully logged out.'
# PARTICIPANT SERVICE - ATTENDACNCE_HISTORY
MSG_CREATE_ATTENDANCE_HISTORY_SUCCESS= 'Sucessfully create attendance checking'
MSG_CREATE_ATTENDANCE_HISTORY_FAIL= 'Fail to create attendace checking'
MSG_ALREADY_HAVE_CHECKED_ATTENDANCE= 'You have already checked attendance'
MSG_CHECKED_ATTENDACE_SUCESSFULLY= 'You have checked attendance sucessfully'
MSG_TIME_CHECKED_ATTENDACE_OVER_SUCESSFULLY= 'Time for checking attendace is over'
MSG_TOO_MUCH_SAMPLE_IMAGE="Too much sample image (>6), you should delete previous sample image before upload"
MSG_NOT_UPLOAD_SAMPLE_IMAGE="you have not uploaded your sample image"
MSG_NOT_UPLOAD_SAMPLE_IMAGE_2=""
# ERROR
MSG_JSON_NOT_VALIDATE = "'json is not validate'"
MSG_UPDATE_ROOM_FAILD = "updated room faild"
MSG_USER_DONT_HAVE_RIGHT = "you do not have right"
MSG_INTERNAL_ERROR = "Internal Server Error"

# ULTIS
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

