import React from 'react';
import './Logout.css';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../../store/auth/auth.slice';

const Logout = () => {

    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <div className="logOut">
            <span>{user.info.login}</span>
            <Button onClick={handleLogout}>log out</Button>
        </div>
    );
};

export default Logout;