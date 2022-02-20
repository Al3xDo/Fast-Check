import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice"
import loadingReducer from "./features/Loading/loadingSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        load: loadingReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})