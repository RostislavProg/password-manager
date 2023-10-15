import './Registration.css';

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { addAccount } from 'store/auth/auth.slice.ts'; 
import { RootState } from 'store/store.ts';
import useReducerForAuthAndReg from 'hooks/useReducerForAuthAndReg';

const Registration: React.FC = () => {

    const { accounts } = useSelector((state: RootState) => state.auth);
    const jsonUserID = JSON.parse(localStorage.getItem('userId') ?? 'null');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (jsonUserID) {
            navigate("/dashboard");
        }
    }, []);

    const [event, updateEvent] = useReducerForAuthAndReg();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const accountVerification = accounts.find(account => account.login === event.login && account.password === event.password);
        if (event.login === '' || event.password === '' || event.repPassword === '') {
            updateEvent({
                type: 'errorUpdate',
                error: 'Fill in all fields'
            });
        } else if (event.login.length < 8 || event.password.length < 8 || event.repPassword.length < 8) {
            updateEvent({
                type: 'errorUpdate',
                error: 'Login and password must be longer than 8 characters'
            });
        } else if (accountVerification) {
            updateEvent({
                type: 'errorUpdate',
                error: 'This account already exists'
            });
        } else if (event.password !== event.repPassword) {
            updateEvent({
                type: 'errorUpdate',
                error: 'Password mismatch'
            });
        } else {
            const newUser = { login: event.login, password: event.password, id: uuidv4() };
            dispatch(addAccount(newUser));
            navigate('/');
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: any) => {
        const {name, value} = e.target;
        updateEvent({
            type,
            [name]: value
        })
    }

    return (
        <section className='autoAndReg'>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => handleChange(e, "loginUpdate")} name='login' placeholder='Login' type="text" maxLength={15} />
                <input onChange={(e) => handleChange(e, "passwordUpdate")} name='password' placeholder='Password' type="password" maxLength={15} autoComplete="new-password" />
                <input onChange={(e) => handleChange(e, "repPasswordUpdate")} name='repPassword' placeholder='Repeat password' type="password" maxLength={15} />
                {event.error && <div className="error-message">{event.error}</div>}
                <Link to="/">log in</Link>
                <input type="submit" value="sign up" />
            </form>
        </section>
    );
}

export default Registration;