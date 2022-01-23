// export const API_ENDPOINT = "localhost:3001/"
export const USER_ENDPOINT = "user/user"
export const ROOMS_ENDPOINT = "room/rooms"
export const ROOM_ENDPOINT = "room"
export const LOGIN_ENDPOINT = "auth/login"
export const SIGNUP_ENDPOINT = "user/signup"
export const ROOM_CREATE_ENDPOINT = "room/create"
export const ROOM_DELETE_ENDPOINT = "room/"
export const CHECK_TOKEN_ENDPOINT = "user/checkToken"
export const API_ENDPOINT = "http://localhost:3001"
export const API_STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    UPDATED: 202,
    MOVED_PERMANENTLY: 301,
    EROR: 401,
    UNAUTHORIZED: 401,
    NOT_FOUND:404,
    NOT_ACCEPTABLE: 406,
    REQUEST_TIME_OUT: 408,
    CONFLICT: 409,
    INTERNAL_ERROR:500
}