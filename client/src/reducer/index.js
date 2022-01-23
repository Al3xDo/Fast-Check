
import { combineReducers } from "redux"
import user from "./user"
import token from "./token"
import room from "./room"
import systemMessage from "./SystemMessage"
const rootReducer = combineReducers({
    user,
    token,
    room,
    systemMessage
})


export default rootReducer