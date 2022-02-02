import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import user from "../../reducer/user";
import { toastError, toastSuccess } from "../../utils/toastNotify";

export const addRoom = createAsyncThunk(
    'rooms/addRoom',
    async (newUser, thunkAPI) => {
        try {
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "*/*",
                    'Access-Control-Allow-Origin': '*',
                }
            }
            const response = await axios.post('http://localhost:3001/user/signup', newUser, config)
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
)
export const logIn = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "*/*",
                    'Access-Control-Allow-Origin': '*',
                }
            }
            const response = await axios.post('http://localhost:3001/auth/login', user, config)
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
)
export const roomsSlice = createSlice({
    name: "rooms",
    initialState: {
        entities: [],
        loading: "idle",
        error: "",
    },
    reducers: {
    },
    // extraReducers: (builder) => {
    //     builder.addCase(signUp.pending, (state) => {
    //         state.token = {};
    //         state.loading = "loading"
    //     })
    //         .addCase(signUp.fulfilled, (state, { payload }) => {
    //             state.token = payload.data.token;
    //             // window.localStorage.setItem("token", payload.data.token);
    //             state.loading = "loaded"
    //         })
    //         .addCase(signUp.rejected, (state, action) => {
    //             state.loading = "error";
    //             state.error = action.error
    //         });
    //     builder.addCase(logIn.pending, (state) => {
    //         state.token = {};
    //         state.loading = "loading"
    //     })
    //         .addCase(logIn.fulfilled, (state, { payload }) => {
    //             state.entites = payload.data.rooms;
    //             state.loading = "loaded"
    //         })
    //         .addCase(logIn.rejected, (state, action) => {
    //             state.loading = "error";
    //             state.error = action.error
    //         })
    // }
})

export const selectRooms = createSelector(
    (state) => ({
        loading: state.rooms.loading,
        token: state.rooms.entities
    }), (state) => state
)

export default roomsSlice.reducer