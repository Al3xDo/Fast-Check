import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toastError } from "../../utils/toastNotify";

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
            toastError(error.response.data.message)
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)
export const logOut = createAsyncThunk(
    'auth/logout',
    async (token, thunkAPI) => {
        try {
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "*/*",
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await axios.post('http://localhost:3001/auth/logout', {}, config)
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.response.data.message });
        }
    }
)
export const AuToken = createAsyncThunk(
    'auth/auToken',
    async (token, thunkAPI) => {
        try {

            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "*/*",
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await axios.post('http://localhost:3001/auth/checkToken', {}, config)
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.response.data.message });
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
        },
        rm: (state) => {
            window.localStorage.removeItem("item")
            state.token = ""
            state.loading = "idle"
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
                window.localStorage.setItem("token", payload.data.token);
                state.loading = "loaded"
            })
            .addCase(logIn.rejected, (state, action) => {
                // console.log(action)
                state.loading = "error";
                // console.log(action)
                state.error = action.payload
            });
        builder.addCase(AuToken.pending, (state) => {
            // state.token = window.localStorage.getItem("token");
            state.loading = "loading"
        })
            .addCase(AuToken.fulfilled, (state, { payload }) => {
                state.loading = "loaded"
            })
            .addCase(AuToken.rejected, (state, action) => {
                // console.log(action)
                window.localStorage.removeItem("token");
                state.token = ""
                state.loading = "error";
                state.error = action.error
            })
        builder.addCase(logOut.fulfilled, (state, { payload }) => {
            window.localStorage.removeItem("token");
            state.loading = "idle"
            state.token = ""
        }).addCase(logOut.rejected, (state, action) => {
            state.error = action.error
            toastError(action.error)
        })
    }
})
export const { load, rm } = authSlice.actions
export const selectAuth = createSelector(
    (state) => ({
        loading: state.auth.loading,
        token: state.auth.token
    }), (state) => state
)

export default authSlice.reducer