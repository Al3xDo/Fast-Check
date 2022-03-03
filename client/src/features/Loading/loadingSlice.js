import { createSlice } from "@reduxjs/toolkit";

function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}
export const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        load: false,
    },
    reducers: {
        setLoading: (state, { payload }) => {
            state.load = payload
        },
    },
})
export const { setLoading } = loadingSlice.actions
export const selectLoading = (state) => state.load

export default loadingSlice.reducer