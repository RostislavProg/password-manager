import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useEffect } from "react";

import './Autorisation.css';
import { jsonContent, login } from "../../../store/auth/auth.slice";
import { useDispatch } from "react-redux";

const Autorisation = () => {

    const { accounts } = useSelector((state) => state.auth);
    const jsonAccounts = JSON.parse(localStorage.getItem('accounts'));
    const jsonAccountsContent = JSON.parse(localStorage.getItem('accountsContent'));
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        console.log({jsonAccounts, jsonAccountsContent});
        dispatch(jsonContent({jsonAccounts, jsonAccountsContent}));
    }, [])

    const [event, updateEvent] = useReducer((state, action) => {
        switch(action.type) {
            case 'loginUpdate': 
                return { ...state, login: action.login };
            case 'passwordUpdate': 
                return { ...state, password: action.password };
            case 'errorUpdate': 
                return { ...state, error: action.error };
            default: return state;
        }
    }, {login: '', password: '', error: ''});

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const accountVerification = accounts.find(account => account.login === event.login && account.password === event.password);
    
        if(event.login === '' || event.password === '') {
            updateEvent({
                type: 'errorUpdate',
                error: 'Fill in all fields'
            })
        } else if(!accountVerification){
            updateEvent({
                type: 'errorUpdate',
                error: 'Wrong login or password'
            })
        } else {
            dispatch(login(accountVerification.id));
            navigate('/dashboard'); // Перенаправление здесь
        }
    }

    const handleLoginChange = (e) => {
        updateEvent({
            type: 'loginUpdate',
            login: e.target.value
        });
    }

    const handlePasswordChange = (e) => {
        updateEvent({
            type: 'passwordUpdate',
            password: e.target.value
        });
    }

    return (
        <section className='autoAndReg'>
            <h1>Autorisation</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleLoginChange} 
                value={event.login}
                placeholder='Login' 
                type="text"/>

                <input 
                onChange={handlePasswordChange} 
                value={event.password}
                placeholder='Password' 
                type="password"/>
                {event.error && <div className="error-message">{event.error}</div>}
                <Link to="/registration">sign up</Link>
                <input type="submit" value="log in" />
            </form>
        </section>
    );
}

export default Autorisation;