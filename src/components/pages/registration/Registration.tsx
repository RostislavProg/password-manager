import './Registration.css';

import React, { useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { addAccount } from '../../../store/auth/auth.slice.ts'; // Удалите расширение .ts
import { EventAction, EventState } from '../../../types/event.ts';

const Registration: React.FC = () => {

    const { accounts } = useSelector((state) => state.auth);
    const jsonUserID = JSON.parse(localStorage.getItem('userId'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!(jsonUserID === null) && !(jsonUserID === "")) {
            navigate("/dashboard");
        }
    }, []);

    const [event, updateEvent] = useReducer((state: EventState, action: EventAction) => {
        switch (action.type) {
            case 'loginUpdate':
                return { ...state, login: action.login };
            case 'passwordUpdate':
                return { ...state, password: action.password };
            case 'repPasswordUpdate':
                return { ...state, repPassword: action.repPassword };
            case 'errorUpdate':
                return { ...state, error: action.error };
            default:
                return state;
        }
    }, { login: '', password: '', repPassword: '', error: '' });

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

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateEvent({
            type: 'loginUpdate',
            login: e.target.value
        });
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateEvent({
            type: 'passwordUpdate',
            password: e.target.value
        });
    }

    const handleRepPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateEvent({
            type: 'repPasswordUpdate',
            repPassword: e.target.value
        });
    }

    return (
        <section className='autoAndReg'>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleLoginChange} placeholder='Login' type="text" maxLength={11} />
                <input onChange={handlePasswordChange} placeholder='Password' type="password" maxLength={13} autoComplete="new-password" />
                <input onChange={handleRepPasswordChange} placeholder='Repeat password' type="password" maxLength={13} />
                {event.error && <div className="error-message" style={{ paddingTop: '15px', color: '#e61a1a', fontSize: '12px' }}>{event.error}</div>}
                <Link to="/">log in</Link>
                <input type="submit" value="sign up" />
            </form>
        </section>
    );
}

export default Registration;