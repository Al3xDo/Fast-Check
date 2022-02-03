import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import user from "../../reducer/user";
import { toastError, toastSuccess } from "../../utils/toastNotify";

export const signUp = createAsyncThunk(
    'auth/signUp',
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
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: {},
        loading: "idle",
        error: "",
    },
    reducers: {
        load: (state) => {
            state.token = window.localStorage.getItem("token")
            if (state.token) {
                state.loading = "loaded"
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.pending, (state) => {
            state.token = {};
            state.loading = "loading"
        })
            .addCase(signUp.fulfilled, (state, { payload }) => {
                state.token = payload.data.token;
                window.localStorage.setItem("token", payload.data.token);
                state.loading = "loaded"
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = "error";
                state.error = action.error
            });
        builder.addCase(logIn.pending, (state) => {
            state.token = {};
            state.loading = "loading"
        })
            .addCase(logIn.fulfilled, (state, { payload }) => {
                // console.log(payload)
                state.token = payload.data.token;
                state.loading = "loaded"
            })
            .addCase(logIn.rejected, (state, action) => {
                // console.log(action)
                state.loading = "error";
                state.error = action.error
            })
    }
})
export const { load } = authSlice.actions
export const selectAuth = createSelector(
    (state) => ({
        loading: state.auth.loading,
        token: state.auth.token
    }), (state) => state
)

export default authSlice.reducer