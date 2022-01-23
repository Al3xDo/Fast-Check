import * as Types from "../constant/room"
import { callApiWithToken } from "../utils/apiCaller"
import * as Config from "../constant/api"
import { toastError, toastSuccess } from "../utils/toastNotify"
import { API_STATUS_CODES } from "../constant/api.js"
import { updateMSG } from "./systemMessage"
export const getRoomsRequest = (token) => {
    return (dispatch => {
        callApiWithToken(Config.ROOMS_ENDPOINT, "GET", {}, token)
            .then(res => {
                dispatch(getRooms(res.data))
            })
            .catch(err => {
                if (err.response.status === API_STATUS_CODES.UNAUTHORIZED) {
                    toastError(String(err.response.data.message))
                }
                else {
                    toastError(String(err.response.data.message))
                }
                // window.location("/login")
                console.log(err.response.data)
                dispatch(updateMSG(err.response.data))
            })
    })
}

export const getRooms = (data) => {
    return {
        type: Types.GET_ROOMS,
        payload: data
    }
}

export const addRoom = (data) => {
    return {
        type: Types.ADD_ROOM,
        payload: data
    }
}