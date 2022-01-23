import * as Types from "../constant/token"
import { callApiWithToken } from "../utils/apiCaller"
import * as Config from "../constant/api"
export const checkTokenRequest = (token) => {
    return (dispatch => {
        callApiWithToken(Config.CHECK_TOKEN_ENDPOINT, "GET", {}, token)
            .catch(err => {dispatch(deleteToken())})
    })
}
export const saveToken = (token) => {
    return {
        type: Types.SAVE_TOKEN,
        payload: token
    }
}

export const updateToken = (token) => {
    return {
        type: Types.UPDATE_TOKEN,
        payload: token
    }
}

export const deleteToken = () => {
    return {
        type: Types.DELETE_TOKEN
    }
}
