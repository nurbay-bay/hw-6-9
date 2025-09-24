import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    selectUserById,
    updateUser,
    deleteUser,
    fetchUsers,
    selectUsersLoading,
    selectUsersError,
} from "../../store/slices/usersSlice";
import type { AppDispatch, RootState } from "../../store/store";

import MainLayoute from "../../layouts/MainLayout/MainLayoute";
import Button from "../../shared/ui/Button/Button";
import Input from "../../shared/ui/Input/Input";

import s from "./UserDetailPage.module.scss";

const UserDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) =>
        selectUserById(state, Number(id))
    );
    const loading = useSelector(selectUsersLoading);
    const error = useSelector(selectUsersError);

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!user) {
            dispatch(fetchUsers());
        }
    }, [user, dispatch]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleUpdate = async () => {
        if (!name.trim() || !email.trim() || !user) return;
        try {
            await dispatch(updateUser({ ...user, name, email })).unwrap();
            setIsEditing(false);
        } catch (err) {
            console.error("Ошибка при обновлении:", err);
        }
    };

    const handleDelete = async () => {
        if (!user) return;
        if (window.confirm("Удалить пользователя?")) {
            try {
                await dispatch(deleteUser(user.id)).unwrap();
                navigate("/users");
            } catch (err) {
                console.error("Ошибка при удалении:", err);
            }
        }
    };

    if (loading) {
        return (
            <MainLayoute>
                <h2 className={s.status}>Загрузка...</h2>
            </MainLayoute>
        );
    }

    if (error) {
        return (
            <MainLayoute>
                <p className={s.error}>Ошибка: {error}</p>
                <Link to="/users" className={s.link}>
                    Назад к списку
                </Link>
            </MainLayoute>
        );
    }

    if (!user) {
        return (
            <MainLayoute>
                <h2 className={s.status}>Пользователь не найден</h2>
                <Link to="/users" className={s.link}>
                    К списку
                </Link>
            </MainLayoute>
        );
    }

    return (
        <MainLayoute>
            <div className={s.wrapper}>
                <h1 className={s.title}>Профиль пользователя</h1>

                {isEditing ? (
                    <div className={s.form}>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Имя"
                        />
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <div className={s.actions}>
                            <Button variant="primary" onClick={handleUpdate} disabled={loading}>
                                Сохранить
                            </Button>
                            <Button variant="secondary" onClick={() => setIsEditing(false)}>
                                Отмена
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className={s.info}>
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>Имя:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <Button variant="secondary" onClick={() => setIsEditing(true)}>
                            Редактировать
                        </Button>
                    </div>
                )}

                <div className={s.actions}>
                    <Button variant="danger" onClick={handleDelete} disabled={loading}>
                        Удалить
                    </Button>
                    <Button variant="secondary" onClick={() => navigate("/users")}>
                        К списку
                    </Button>
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                        Назад
                    </Button>
                </div>
            </div>
        </MainLayoute>
    );
};

export default UserDetailPage;
