import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        load: false,
    },
    reducers: {
        setLoading: (state, { payload }) => {
            // setTimeout(() => {
            //     state.load = payload
            // }, 1000)
            state.load = payload
        },
    },
})
export const { setLoading } = loadingSlice.actions
export const selectLoading = (state) => state.load

export default loadingSlice.reducer