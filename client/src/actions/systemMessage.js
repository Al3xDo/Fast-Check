import * as Types from "../constant/systemMessage"

export const updateMSG = (data) => {
    return {
        type: Types.UPDATE_MSG,
        payload: data
    }
}