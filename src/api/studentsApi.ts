import axios from "axios";
import type { Student } from "../shared/types/Student";

const API_URL = "http://localhost:8000/api/students";
const auth = { username: "admin", password: "123" };

export const studentsApi = {
  getStudents: async (): Promise<Student[]> => {
    const res = await axios.get<Student[]>(API_URL, { auth });
    return res.data;
  },

  updateAttend: async (
    id: number,
    attend: "present" | "late" | "none"
  ): Promise<Student> => {
    const res = await axios.put<Student>(
      `${API_URL}/${id}/attend`,
      { attend },
      { auth }
    );
    return res.data;
  },

  updateGrade: async (id: number, grade: number): Promise<Student> => {
    const res = await axios.put<Student>(
      `${API_URL}/${id}/grade`,
      { grade },
      { auth }
    );
    return res.data;
  },
};
