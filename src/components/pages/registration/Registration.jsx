import './Registration.css';
import { Link, useNavigate } from 'react-router-dom';
import { useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';

import { useSelector, useDispatch } from 'react-redux'
import { addAccount } from '../../../store/auth/auth.slice';

const Registration = () => {

    const { accounts } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [event, updateEvent] = useReducer((state, action) => {
        switch(action.type) {
            case 'loginUpdate': 
                return { ...state, login: action.login };
            case 'passwordUpdate': 
                return { ...state, password: action.password };
            case 'repPasswordUpdate': 
                return { ...state, repPassword: action.repPassword };
            case 'errorUpdate': 
                return { ...state, error: action.error };
            default: return state;
        }
    }, {login: '', password: '', repPassword: '', error: ''});

    const handleSubmit = (e) => {
        e.preventDefault();

        const accountVerification = accounts.find(account => account.login === event.login && account.password === event.password);

        if(event.login === '' || event.password === '' || event.repPassword === '') {
            updateEvent({
                type: 'errorUpdate',
                error: 'Fill in all fields'
            })
        } else if(accountVerification){
            updateEvent({
                type: 'errorUpdate',
                error: 'This account already exist'
            })
        } else if(event.password !== event.repPassword){
            updateEvent({
                type: 'errorUpdate',
                error: 'Password mismatch'
            })
        } else {
            const newUser = { login: event.login, password: event.password, id: uuidv4()}
            dispatch(addAccount(newUser));
            navigate('/');
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

    const handleRepPasswordChange = (e) => {
        updateEvent({
            type: 'repPasswordUpdate',
            repPassword: e.target.value
        });
    }

    return (
        <section className='autoAndReg'>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleLoginChange} placeholder='Login' type="login" maxLength="11" />
                <input onChange={handlePasswordChange} placeholder='Password' type="password" maxLength="13" autoComplete="new-password"/>
                <input onChange={handleRepPasswordChange} placeholder='Repeat password' type="password" maxLength="13" />
                {event.error && <div className="error-message">{event.error}</div>}
                <Link to="/">log in</Link>
                <input type="submit" value="sign up"/>
            </form>
        </section>
    )
}
  
export default Registration;