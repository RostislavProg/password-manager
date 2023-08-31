import React from 'react';
import './Logout.css';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../../store/auth/auth.slice';
import { useGetUser } from '../../../../../hooks/useGetUser';

const Logout = () => {

    const { user } = useGetUser()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <div className="logOut">
            <span>{user.login}</span>
            <Button onClick={handleLogout}>log out</Button>
        </div>
    );
};

export default Logout;