import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/user"
import colorsReducer from "../features/colorsSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        colors: colorsReducer
    },
})