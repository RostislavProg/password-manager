import './EditForm.css'

import React, { useReducer, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editContent } from "../../../../../store/auth/auth.slice.ts";
import { select } from "../../../../../store/edit/edit.slice.ts";
import { FormsState } from "../../../../../types/states.ts";
import { EventFormAction } from '../../../../../types/actions.ts';
import { RootState } from '../../../../../store/store.ts';


const EditForm: React.FC = () => {
    
    const { selectedUnitId } = useSelector((state: RootState) => state.edit) as { selectedUnitId: string };
    const dispatch = useDispatch()

    const [event, updateEvent] = useReducer((state: FormsState, action: EventFormAction) => {
        switch(action.type) {
            case 'logUpdate': 
                return { ...state, log: action.log || '' };
            case 'passUpdate': 
                return { ...state, pass: action.pass || '' };
            case 'errorUpdate': 
                return { ...state, error: action.error || '' };
            case 'zeroing': 
                return { ...state, log: '', pass: '', error: '' };
            default: return state;
        }
    }, {log: '', pass: '', error: ''});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    
        if(event.log === '' || event.pass === '') {
            updateEvent({
                type: 'errorUpdate',
                error: 'Fill in all fields'
            })
        } else if (event.log.length <= 6 || event.pass.length <= 6) {
            updateEvent({
                type: 'errorUpdate',
                error: 'Login and password must be longer than 8 characters'
            });
        } else {
            const unitToEdit = {id: selectedUnitId, log: event.log, pass: event.pass}
            dispatch(editContent(unitToEdit));
            dispatch(select(""))
            updateEvent({type: 'zeroing'})
        }
    }

    const handleLogChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateEvent({
            type: 'logUpdate',
            log: e.target.value
        });
    }

    const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                {event.error && <div className="error-message" style={{ color: '#e61a1a', fontSize: '12px' }}>{event.error}</div>}
                </form> : <span>Select what you want change</span>}
        </div>
    );
}
  
export default EditForm;