import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { autorisation, changeCurrent } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const Autorisation = () => {

    useEffect(() => {
        dispatch(changeCurrent());
        if(localStorage.getItem('currentAccount') !== null && localStorage.getItem('currentAccount') !== "null"){
            navigate('/dashboard');
        }else{
            navigate('/');
        }
    }, []);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const accounts = useSelector(state => state.accountsReducer.accounts); 

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const accountCheck = accounts.some((account) => {
            return account.name.toLowerCase() === login.toLowerCase() && account.password.toLowerCase() === password.toLowerCase();
        });

        if (!login || !password) {
            setErrorMessage('Please fill in all fields');
        }else if(!accountCheck){
            setErrorMessage('Incorrect login or password');
        }else {
            setErrorMessage('');
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


    return (
        <section className='autoAndReg'>
            <h1>Autorisation</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={onChangeLogin} placeholder='Login' type="login"/>
                <input onChange={onChangePassword} placeholder='Password' type="password"/>
                {errorMessage && <p style={{ fontSize: '16px', color: '#E32636', margin: '10px 0' }}>{errorMessage}</p>}
                <Link to="/registration">sign up</Link>
                <input type="submit" value="log in" />
            </form>
        </section>
    );
}

export default Autorisation;