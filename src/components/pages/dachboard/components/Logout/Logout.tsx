import './Logout.css';

import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'store/auth/auth.slice.ts';
import { useGetUser } from 'hooks/useGetUser.ts';

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
        {user && (
            <span style={{ fontSize: user.login?.length >= 10 ? "13px" : "20px" }}>
                {user.login}
            </span>
        )}
        <Button onClick={handleLogout}>log out</Button>
    </div>
    );
};

export default Logout;