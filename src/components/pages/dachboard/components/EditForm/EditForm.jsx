import { useDispatch, useSelector } from "react-redux";
import { useReducer } from "react";

import './EditForm.css'
import { editContent } from "../../../../../store/auth/auth.slice";

const EditForm = () => {
    
    const { selectedUnitId } = useSelector((state) => state.edit)
    const dispatch = useDispatch()

    const [event, updateEvent] = useReducer((state, action) => {
        switch(action.type) {
            case 'logUpdate': 
                return { ...state, log: action.log };
            case 'passUpdate': 
                return { ...state, pass: action.pass };
            case 'errorUpdate': 
                return { ...state, error: action.error };
            case 'zeroing': 
                return { ...state, service: '', log: '', pass: '', error: '' };
            default: return state;
        }
    }, {log: '', pass: '', error: ''});

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if(event.log === '' || event.pass === '') {
            updateEvent({
                type: 'errorUpdate',
                error: 'Fill in all fields'
            })
        } else {
            const unitToEdit = {id: selectedUnitId, log: event.log, pass: event.pass}
            dispatch(editContent(unitToEdit));
            updateEvent({type: 'zeroing'})
        }
    }

    const handleLogChange = (e) => {
        updateEvent({
            type: 'logUpdate',
            log: e.target.value
        });
    }

    const handlePassChange = (e) => {
        updateEvent({
            type: 'passUpdate',
            pass: e.target.value
        });
    }

    return (
        <div className="add">
            {selectedUnitId ? 
                <form onSubmit={handleSubmit}>
                    <input onChange={handleLogChange} value={event.log} placeholder="Login" type="text" />
                    <input onChange={handlePassChange} value={event.pass} placeholder="Password" type="password" />
                    <input type="submit" value="EDIT"/>
                </form> : <span>Select what you want change</span>}
        </div>
    );
}
  
export default EditForm;