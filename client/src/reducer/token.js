import * as Types from "../constant/token"
var tokenString = JSON.parse(localStorage.getItem("cat-check-token"))


var initialState = tokenString ? tokenString : ""

const token = (state = initialState, action) => {
    switch (action.type) {
        case Types.SAVE_TOKEN:
            state = action.payload
            localStorage.setItem("cat-check-token", JSON.stringify(state))
            return state
        case Types.DELETE_TOKEN:
            state = ""
            localStorage.removeItem("cat-check-token")
            return state
        case Types.UPDATE_TOKEN:
            state = ""
            localStorage.setItem("cat-check-token", JSON.stringify(state))
            return state
        default:
            return state
    }
}

export default token