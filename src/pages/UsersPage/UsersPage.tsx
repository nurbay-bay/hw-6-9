import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayoute from '../../layouts/MainLayout/MainLayoute';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUsers,
    addUser,
    deleteUser,
    selectAllUsers,
    selectUsersLoading,
    selectUsersError,
} from '../../store/slices/usersSlice';
import { type AppDispatch } from '../../store/store';

import Button from '../../shared/ui/Button/Button';
import Input from '../../shared/ui/Input/Input';

import s from './UsersPage.module.scss';

const UsersPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const users = useSelector(selectAllUsers);
    const loading = useSelector(selectUsersLoading);
    const error = useSelector(selectUsersError);

    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleAddUser = async () => {
        if (newUserName.trim() && newUserEmail.trim()) {
            try {
                await dispatch(
                    addUser({
                        name: newUserName.trim(),
                        email: newUserEmail.trim(),
                    })
                ).unwrap();

                setNewUserName('');
                setNewUserEmail('');
                setShowForm(false);
            } catch (error) {
                console.error('Ошибка создания пользователя', error);
            }
        }
    };

    const handleDeleteUser = async (userId: number) => {
        if (window.confirm('Уверены что хотите удалить пользователя?')) {
            try {
                await dispatch(deleteUser(userId)).unwrap();
            } catch (error) {
                console.error('Ошибка удаления пользователя', error);
            }
        }
    };

    return (
        <MainLayoute>
            <div className={s.wrapper}>
                <h1 className={s.title}>Пользователи</h1>

                <Button variant="secondary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Отменить' : 'Добавить пользователя'}
                </Button>

                {showForm && (
                    <div className={s.form}>
                        <h2>Новый Пользователь</h2>
                        <Input
                            placeholder="Имя"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                        />
                        <Input
                            placeholder="Email"
                            value={newUserEmail}
                            onChange={(e) => setNewUserEmail(e.target.value)}
                        />
                        <Button
                            variant="primary"
                            onClick={handleAddUser}
                            disabled={loading}
                        >
                            Добавить
                        </Button>
                    </div>
                )}

                <div className={s.users}>
                    <h2>Список пользователей</h2>
                    {loading && <h1>Загрузка...</h1>}
                    {error && <p>Ошибка {error}</p>}

                    {users.map((user) => (
                        <div key={user.id} className={s.userCard}>
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>
                            <Link to={`/users/${user.id}`}>Подробнее</Link>
                            <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                                Удалить
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayoute>
    );
};

export default UsersPage;
