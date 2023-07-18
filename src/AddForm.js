import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUnit } from "./redux/actions";

const AddForm = () => {

    const units = useSelector(state => state.changeUnitsReducer.units)
    /**
     * SuggestionL this is classic useSate hell i would recommend to use useReducer here more info here https://www.builder.io/blog/use-reducer
     * this will help you to do:
     *  - validation form fully
     *  - share validation logic with other forms
     */
    const [unitName, setUnitName] = useState('');
    const [unitLogin, setUnitLogin] = useState('');
    const [unitPassword, setUnitPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [event, updateEvent] = useReducer((state, action) => {
        const newEvent = {...state}

        switch (action.type) {
            case 'updateName':
            // plus any kind of validation could be performed
            newEvent.name = action.name;
            break;
        }
        return newEvent
    }, { name: '', login: '', password: '' })

    const dispatch = useDispatch();


    // Suggestion: this validation should be performed in input changes. On submit could have validation if it is coming from backend
    const handleSubmit = (event) => {
        event.preventDefault();

        const isUnitExists = units.some((unit) => {
            return (
                (unit.unitName.toLowerCase() === unitName.toLowerCase() ||
                unit.unitLogin.toLowerCase() === unitLogin.toLowerCase() ||
                unit.unitPassword.toLowerCase() === unitPassword.toLowerCase())
            );
          });

        if (isUnitExists) {
            setErrorMessage('Unit already exists');
        } else if (!unitName || !unitLogin || !unitPassword) {
            setErrorMessage('Please fill in all fields');
        } else {
            setErrorMessage('');
            setUnitName('');
            setUnitLogin('');
            setUnitPassword('');
            dispatch(addUnit({ unitName, unitLogin, unitPassword }));
        }
    }

    const onChangeName = (event) => {
        setUnitName(event.target.value);
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
                <input onChange={e => updateEvent({ type: 'updateName', name: e.target.value }) } value={event.title} placeholder="Site/progsramm" type="text" maxLength="15"/>
                <input onChange={onChangeName} value={unitName} placeholder="Site/progsramm" type="text" maxLength="15"/>
                <input onChange={onChangeLogin} value={unitLogin} placeholder="Login" type="text" maxLength="15"/>
                <input onChange={onChangePassword} value={unitPassword} placeholder="Password" type="password" maxLength="15"/>
                {errorMessage && <p style={{ fontSize: '16px', color: '#E32636', marginTop: '10px', marginBottom: '0' }}>{errorMessage}</p>}
                <input type="submit" value="ADD"/>
            </form>
        </div>
    );
}

export default AddForm;
