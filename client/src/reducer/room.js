import * as Types from "../constant/room"

var initialState = []




const room = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_ROOMS:
            state = action.payload
            return [...state]
        default: return state
    }
}

export default room