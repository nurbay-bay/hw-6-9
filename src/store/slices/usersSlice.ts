import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../../shared/types/User";
import { usersApi } from "../../api/usersApi";



interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null
}

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            return await usersApi.getUsers()
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || 'Ошибка загрузки пользователей')
        }
    }
)

export const addUser = createAsyncThunk(
    'user/createUsers',
    async (userData: Omit<User, 'id'>, { rejectWithValue }) => {
        try {
            return await usersApi.addUser(userData)
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || 'Ошибка добавления пользователя')
        }
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUsers',
    async (user: User, { rejectWithValue }) => {
        try {
            return await usersApi.updateUser(user)
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || 'Ошибка обнавления пользователя')
        }
    }
)

export const deleteUser = createAsyncThunk(
    'user/deleteUsers',
    async (userId: number, { rejectWithValue }) => {
        try {
            await usersApi.deleteUser(userId)
            return userId
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || 'Ошибка удаления пользователя')
        }
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        // Загрузка пользователей
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // Добавление пользователей
            .addCase(addUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false
                state.users.push(action.payload)
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // Обновление пользователей
            .addCase(updateUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false
                const index = state.users.findIndex(user => user.id === action.payload.id)
                if (index !== -1) {
                    state.users[index] = action.payload
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // Удаление пользователей
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false
                state.users = state.users.filter(user => user.id !== action.payload)
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const { clearError } = usersSlice.actions

export const selectAllUsers = (state: { users: UsersState }) =>
    state.users.users;
export const selectUsersLoading = (state: { users: UsersState }) =>
    state.users.loading;
export const selectUsersError = (state: { users: UsersState }) =>
    state.users.error;
export const selectUserById = (state: { users: UsersState }, userId: number) =>
    state.users.users.find((user) => user.id === userId);