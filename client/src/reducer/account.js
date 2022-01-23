import * as types from "../constant/account"
var initialState = []

const account = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ACCOUNT_SUCCESS:
            var { data } = action.payload;
            console.log(data)
            return state;
        default:
            return state
    }
}


export default account;