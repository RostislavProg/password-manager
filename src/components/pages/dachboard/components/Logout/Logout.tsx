import React from 'react';
import './Logout.css';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../../store/auth/auth.slice.ts'; // Удалите расширение .ts
import { useGetUser } from '../../../../../hooks/useGetUser.ts'; // Удалите расширение .ts

const Logout: React.FC = () => {

    const { user } = useGetUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <div className="logOut">
            <span>{user?.login}</span> {/* Добавил ?. для обработки случая, когда user может быть null */}
            <Button onClick={handleLogout}>log out</Button>
        </div>
    );
};

export default Logout;