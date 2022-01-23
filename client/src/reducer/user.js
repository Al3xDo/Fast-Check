import * as Types from "../constant/user"
var initialState = {
    name: "",
    email: "",
    avatar: "",
    password: ""
}
const user = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_USER:
            state = action.payload.data
            return state
        case Types.UPDATE_USER:
            state = action.payload
            return state
        case Types.DELETE_USER:
            state = initialState
            return state
        default: return state
    }
}

export default user
