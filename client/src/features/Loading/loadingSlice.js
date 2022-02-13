import { createSelector, createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        load: false,
        error: "",
    },
    reducers: {
        set: (state, status) => {
            state.loading = status
        },
    },
})
export const { set } = loadingSlice.actions
export const selectLoading = createSelector(
    (state) => ({
        loading: state.loading.load,
    }), (state) => state
)

export default loadingSlice.reducer