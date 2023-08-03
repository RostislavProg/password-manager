import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUnit, changeChangeState } from "../../../../redux/actions/actions";

const ChangeForm = () => {

    const unitName = useSelector(state => state.addOrChangeReducer.changeName)
    
    const [unitLogin, setUnitLogin] = useState('');
    const [unitPassword, setUnitPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();


    const handleSubmit = (event) => {
        event.preventDefault();
      
        if (!unitName || !unitLogin || !unitPassword) {
          setErrorMessage('Please fill in all fields');
        } else {
          setErrorMessage('');
          setUnitLogin('');
          setUnitPassword('');
          
          const changedUnit = {
            unitName: unitName,
            unitLogin: unitLogin,
            unitPassword: unitPassword
          };
      
          dispatch(changeUnit(changedUnit));
          dispatch(changeChangeState());
        }
      };

    const onChangeLogin = (event) => {
        setUnitLogin(event.target.value);
    };

    const onChangePassword = (event) => {
        setUnitPassword(event.target.value);
    };

    return (
        <div className="add">
            <form onSubmit={handleSubmit}>
                <input onChange={onChangeLogin} placeholder="Login" type="text" />
                <input onChange={onChangePassword} placeholder="Password" type="password" />
                {errorMessage && <p style={{ fontSize: '16px', color: '#E32636', marginTop: '10px', marginBottom: '0' }}>{errorMessage}</p>}
                <input type="submit" value="CHANGE"/>
            </form>
        </div>
    );
}
  
export default ChangeForm;