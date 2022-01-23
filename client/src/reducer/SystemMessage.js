import * as Types from "../constant/systemMessage"

var initialState = {
    status: "",
    message: ""
}

const systemMessage = (state = initialState, action) => {
    switch (action.type) {
        case Types.UPDATE_MSG:
            state = action.payload
            return state
        default:
            return state
    }
}

export default systemMessage