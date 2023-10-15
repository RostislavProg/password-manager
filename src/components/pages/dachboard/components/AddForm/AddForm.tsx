import './AddForm.css';

import React, { ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { addContent } from "store/auth/auth.slice.ts";
import useMyReducer from 'hooks/useReducerForForms';




const AddForm: React.FC = () => {
    const dispatch = useDispatch()

    const [event, updateEvent] = useMyReducer();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    
        if(event.log === '' || event.pass === '' || event.service === '') {
            updateEvent({
                type: 'errorUpdate',
                error: 'Fill in all fields'
            })
        }else if (event.log.length < 8 || event.pass.length < 8) {
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
            updateEvent({type: 'reset'})
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>, type: any) => {
        const {name, value} = e.target;
        updateEvent({
            type,
            [name]: value
        })
    }

    return (
        <div className="add">
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => handleChange(e, "serviceUpdate")} name='service' value={event.service} placeholder="Service/programme" type="text" maxLength={15}/>
                <input onChange={(e) => handleChange(e, "logUpdate")} name='log' value={event.log} placeholder="Login" type="text" maxLength={15}/>
                <input onChange={(e) => handleChange(e, "passUpdate")} name='pass' value={event.pass} placeholder="Password" type="password" maxLength={15} autoComplete="new-password"/>
                <input type="submit" value="ADD"/>
                {event.error && <div className="error-message">{event.error}</div>}
            </form>
        </div>
    );
}
  
export default AddForm;