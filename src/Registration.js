import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { autorisation, registration } from './redux/actions';


const Registration = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [secPassword, setSecPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const accounts = useSelector(state => state.accountsReducer.accounts); 

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSubmit = (event) => {
        event.preventDefault();

        function isPasswordStrong(password) {
            const minLength = 8;
            const hasUppercase = /[A-Z]/.test(password);
            const hasLowercase = /[a-z]/.test(password);
            const hasDigit = /[0-9]/.test(password);
            const hasNoSpaces = /^\S+$/.test(password);
          
            return (
              password.length >= minLength &&
              hasUppercase &&
              hasLowercase &&
              hasNoSpaces &&
              hasDigit
            );
          }

        const repeatCheck = accounts.some((account) => {
            return account.name.toLowerCase() === login.toLowerCase();
        });

        if (!login || !password || !secPassword) {
            setErrorMessage('Please fill in all fields');
        }else if(password !== secPassword ){
            setErrorMessage('Password mismatch');
        }else if(!isPasswordStrong(password)){
            setErrorMessage('Password is not strong');
        }else if(repeatCheck){
            setErrorMessage('Login already exist');
        }else {
            setErrorMessage('');
            dispatch(registration(login, password));
            dispatch(autorisation(login));
            navigate('/dashboard');
        }
    };

    const onChangeLogin = (event) => {
        setLogin(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onChangeSecPassword = (event) => {
        setSecPassword(event.target.value);
    };


    return (
        <section className='autoAndReg'>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={onChangeLogin} placeholder='Login' type="login" maxLength="11" />
                <input onChange={onChangePassword} placeholder='Password' type="password" maxLength="13" />
                <input onChange={onChangeSecPassword} placeholder='Repeat password' type="password" maxLength="13" />
                {errorMessage && <p style={{ fontSize: '16px', color: '#E32636', margin: '10px 0' }}>{errorMessage}</p>}
                <Link to="/">log in</Link>
                <input type="submit" value="sign up"/>
            </form>
        </section>
    );
  }
  
export default Registration;