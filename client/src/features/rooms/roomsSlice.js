import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

export const roomsSlice = createSlice({
    name: "rooms",
    initialState: {
        entities: [],
    },
    reducers: {
        addRoom: (state, { payload }) => {
            state.entities = [...state.entities, payload]
            return state
        },
        deleteRoom: (state, { payload }) => {
            state.entities = state.entities.filter((room) => room.id !== payload)
            return state
        },
        editRoom: (state) => {
            return state
        }
    }
})

export const selectRooms = createSelector(
    (state) => ({
        // loading: state.rooms.loading,
        rooms: state.rooms.entities
    }), (state) => state
)

export default roomsSlice.reducer