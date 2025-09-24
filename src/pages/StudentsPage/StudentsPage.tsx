import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import {
    fetchStudents,
    updateStudentGrade,
    updateStudentAttend,
    selectAllStudents,
    selectStudentsLoading,
    selectStudentsError,
} from "../../store/slices/studentsSlice";

import MainLayout from "../../layouts/MainLayout/MainLayoute";
import Input from "../../shared/ui/Input/Input";
import Select from "../../shared/ui/Select/Select";
import s from "./StudentsPage.module.scss";

const StudentsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const students = useSelector((state: RootState) => selectAllStudents(state));
    const loading = useSelector((state: RootState) => selectStudentsLoading(state));
    const error = useSelector((state: RootState) => selectStudentsError(state));

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    const handleGradeChange = (id: number, value: string) => {
        const grade = Math.min(12, Math.max(0, Number(value)));
        dispatch(updateStudentGrade({ id, grade }));
    };

    const handleAttendChange = (id: number, value: string) => {
        dispatch(updateStudentAttend({ id, attend: value as "present" | "late" | "none" }));
    };

    return (
        <MainLayout>
            <div className={s.page}>
                <h1>Студенты</h1>

                {loading && <p>Загрузка...</p>}
                {error && <p className={s.error}>{error}</p>}

                <table className={s.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Посещение</th>
                            <th>Оценка</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s) => (
                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>{s.name}</td>
                                <td>
                                    <Select
                                        value={s.attend}
                                        onChange={(val) => handleAttendChange(s.id, val)}
                                        options={[
                                            { value: "none", label: "Отсутствовал" },
                                            { value: "late", label: "Опоздал" },
                                            { value: "present", label: "Присутствовал" },
                                        ]}
                                    />
                                </td>
                                <td>
                                    <Input
                                        type="number"
                                        value={s.grade.toString()}
                                        onChange={(e) => handleGradeChange(s.id, e.target.value)}
                                        placeholder="0–12"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </MainLayout>
    );
};

export default StudentsPage;
