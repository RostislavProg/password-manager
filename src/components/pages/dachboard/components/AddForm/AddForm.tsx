import './AddForm.css';

import React, { useReducer, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { addContent } from "../../../../../store/auth/auth.slice.ts";
import { FormsState } from "../../../../../types/states.ts";
import { EventFormAction } from '../../../../../types/actions.ts';



const AddForm: React.FC = () => {
    const dispatch = useDispatch()

    const [event, updateEvent] = useReducer((state: FormsState, action: EventFormAction) => {
        switch(action.type) {
            case 'serviceUpdate': 
                return { ...state, service: action.service || '' };
            case 'logUpdate': 
                return { ...state, log: action.log || '' };
            case 'passUpdate': 
                return { ...state, pass: action.pass || '' };
            case 'errorUpdate': 
                return { ...state, error: action.error || '' };
            case 'zeroing': 
                return { ...state, service: '', log: '', pass: '', error: '' };
            default: return state;
        }
    }, {service: '', log: '', pass: '', error: ''});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    
        if(event.log === '' || event.pass === '' || event.service === '') {
            updateEvent({
                type: 'errorUpdate',
                error: 'Fill in all fields'
            })
        }else if (event.log.length <= 6 || event.pass.length <= 6) {
            updateEvent({
                type: 'errorUpdate',
                error: 'Login and password must be longer than 8 characters'
            });
        } else {
            const contentData = {
                service: event.service,
                log: event.log,
                pass: event.pass,
                id: uuidv4()
            };

            dispatch(addContent(contentData));
            updateEvent({type: 'zeroing'})
        }
    }

    const handleSeviceChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateEvent({
            type: 'serviceUpdate',
            service: e.target.value
        });
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
            <form onSubmit={handleSubmit}>
                <input onChange={handleSeviceChange} value={event.service} placeholder="Service/programme" type="text" maxLength={15}/>
                <input onChange={handleLogChange} value={event.log} placeholder="Login" type="text" maxLength={15}/>
                <input onChange={handlePassChange} value={event.pass} placeholder="Password" type="password" maxLength={15} autoComplete="new-password"/>
                <input type="submit" value="ADD"/>
                {event.error && <div className="error-message" style={{ color: '#e61a1a', fontSize: '12px' }}>{event.error}</div>}
            </form>
        </div>
    );
}
  
export default AddForm;