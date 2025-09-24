// src/store/slices/studentsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { studentsApi } from "../../api/studentsApi";
import type { Student } from "../../shared/types/Student";

interface StudentsState {
  students: Student[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentsState = {
  students: [],
  loading: false,
  error: null,
};

// получить всех
export const fetchStudents = createAsyncThunk(
  "students/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await studentsApi.getStudents();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Ошибка загрузки студентов");
    }
  }
);

// обновить посещаемость
export const updateStudentAttend = createAsyncThunk<
  Student,
  { id: number; attend: "none" | "late" | "present" }
>(
  "students/updateAttend",
  async ({ id, attend }, { rejectWithValue }) => {
    try {
      return await studentsApi.updateAttend(id, attend);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Ошибка обновления посещаемости");
    }
  }
);

// обновить оценку
export const updateStudentGrade = createAsyncThunk(
  "students/updateGrade",
  async ({ id, grade }: { id: number; grade: number }, { rejectWithValue }) => {
    try {
      return await studentsApi.updateGrade(id, grade);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Ошибка обновления оценки");
    }
  }
);

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateStudentAttend.fulfilled, (state, action) => {
        const idx = state.students.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) state.students[idx] = action.payload;
      })
      .addCase(updateStudentGrade.fulfilled, (state, action) => {
        const idx = state.students.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) state.students[idx] = action.payload;
      });
  },
});

export const { clearError } = studentsSlice.actions;
export const selectAllStudents = (state: { students: StudentsState }) =>
  state.students.students;

export const selectStudentsLoading = (state: { students: StudentsState }) =>
  state.students.loading;

export const selectStudentsError = (state: { students: StudentsState }) =>
  state.students.error;