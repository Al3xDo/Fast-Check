import * as constant from "../constant/user"
import { callApiWithToken } from "../utils/apiCaller"
import * as Config from "../constant/api"
import { toastError, toastSuccess } from "../utils/toastNotify"
// import { callApiWithToken } from "../utils/apiCaller"



// export const actGetAccountRequest = () => {
//     return (dispatch) => {
//         return callApiWithToken('user', 'GET', token)
//             .then(res => {
//                 dispatch(getAccount(res.data))
//             })
//     }
// }
// export const actSignUpRequest = (token) => {
//     return (dispatch) => {
//         return callApiWithToken('user', 'POST', token)
//             .then(res => {
//                 dispatch(signUpSuccess(res.data))
//             })
//     }
// }
// login
export const getUserRequest = (token) => {
    return (dispatch) => {
        return callApiWithToken(Config.USER_ENDPOINT, 'GET', {}, token)
            .then(res => {
                dispatch(getUser(res.data))
            })
            .catch(err => {
                // console.log(err)
                toastError(err)
            })
    }
}
export const updateUserRequest = (data, token) => {
    return (dispatch) => {
        return callApiWithToken(Config.USER_ENDPOINT, 'PUT', data, token)
            .then(res => {
                dispatch(updateUser(res.data.room))
                toastSuccess(res.data.message)
            })
            .catch(err => {
                toastError(err.response.message)
            })
    }
}
export const deleteUserRequest = (id, token) => {
    return (dispatch) => {
        return callApiWithToken(Config.USER_ENDPOINT, 'DELETE', id, token)
            .then(res => {
                dispatch(deleteUser(res.data.id))
                toastSuccess(res.data.message)
            })
            .catch(err => {
                toastError(err.response.message)
            })
    }
}
export const getUser = (data) => {
    return {
        type: constant.GET_USER,
        payload: {
            data: data
        }
    }
}

export const updateUser = (data) => {
    return {
        type: constant.UPDATE_USER,
        payload: {
            data: data
        }
    }
}

export const deleteUser = (data) => {
    return {
        type: constant.DELETE_USER,
        payload: {
            data: data
        }
    }
}





// export const getAccount = (data) => {
//     return {
//         type: constant.GET_ACCOUNT,
//         payload: {
//             data: data
//         }
//     }
// }
// export const LoginFaield = (data) => {
//     return {
//         type: constant.LOGIN_FAIL,
//         payload: {
//             data: data
//         }
//     }
// }
// export const getAccountSuccess = (data) => {
//     return {
//         type: constant.GET_ACCOUNT_SUCCESS,
//         payload: {
//             data
//         }
//     }
// }

// export const getAccountFailed = (error) => {
//     return {
//         type: constant.GET_ACCOUNT_FAILED,
//         payload: {
//             error
//         }
//     }
// }

// export const signUpSuccess = (data) => {
//     return {
//         type: constant.SIGNUP_SUCCESS,
//         payload: {
//             data: data
//         }
//     }
// }