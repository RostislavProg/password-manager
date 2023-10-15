import './Autorisation.css';

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login } from "store/auth/auth.slice.ts";
import { RootState } from 'store/store.ts';
import useReducerForAuthAndReg from 'hooks/useReducerForAuthAndReg';


const Autorisation: React.FC = () => {
    const jsonUserID = JSON.parse(localStorage.getItem('userId') ?? 'null');
    const { accounts } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (jsonUserID) {
            navigate('/dashboard');
        }
    }, []);

    const [event, updateEvent] = useReducerForAuthAndReg();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const accountVerification = accounts.find(account =>
            account.login === event.login && account.password === event.password
        );

        if (!event.login || !event.password) {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: any) => {
        const {name, value} = e.target;
        updateEvent({
            type,
            [name]: value
        })
    }

    return (
        <section className='autoAndReg'>
            <h1>Autorisation</h1>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => handleChange(e, "loginUpdate")}
                    name='login'
                    value={event.login}
                    placeholder='Login'
                    type="text"
                />

                <input
                    onChange={(e) => handleChange(e, "passwordUpdate")}
                    name='password'
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