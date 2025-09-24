import { configureStore } from "@reduxjs/toolkit"
import { usersSlice } from "./slices/usersSlice"
import { studentsSlice } from "./slices/studentsSlice"

export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        students: studentsSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
