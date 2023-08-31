import './Autorisation.css';

import React, { useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login } from "../../../store/auth/auth.slice.ts";
import { EventAction, EventState } from "../../../types/event";


const Autorisation: React.FC = () => {
    const jsonUserID: string | null = JSON.parse(localStorage.getItem('userId'));
    const { accounts } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (jsonUserID !== null && jsonUserID !== "") {
            navigate('/dashboard');
        }
    }, []);

    const [event, updateEvent] = useReducer((state: EventState, action: EventAction) => {
        switch (action.type) {
            case 'loginUpdate':
                return { ...state, login: action.login };
            case 'passwordUpdate':
                return { ...state, password: action.password };
            case 'errorUpdate':
                return { ...state, error: action.error };
            default:
                return state;
        }
    }, { login: '', password: '', error: '' });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const accountVerification = accounts.find(account =>
            account.login === event.login && account.password === event.password
        );

        if (event.login === '' || event.password === '') {
            updateEvent({
                type: 'errorUpdate',
                error: 'Fill in all fields'
            });
        } else if (!accountVerification) {
            updateEvent({
                type: 'errorUpdate',
                error: 'Wrong login or password'
            });
        } else {
            dispatch(login(accountVerification.id));
            navigate('/dashboard');
        }
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateEvent({
            type: 'loginUpdate',
            login: e.target.value
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateEvent({
            type: 'passwordUpdate',
            password: e.target.value
        });
    };

    return (
        <section className='autoAndReg'>
            <h1>Autorisation</h1>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleLoginChange}
                    value={event.login}
                    placeholder='Login'
                    type="text"
                />

                <input
                    onChange={handlePasswordChange}
                    value={event.password}
                    placeholder='Password'
                    type="password"
                />
                {event.error && <div className="error-message">{event.error}</div>}
                <Link to="/registration">sign up</Link>
                <input type="submit" value="log in" />
            </form>
        </section>
    );
}

export default Autorisation;