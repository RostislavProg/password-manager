import './EditForm.css'

import React, { ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editContent } from "store/auth/auth.slice.ts";
import { select } from "store/edit/edit.slice.ts";
import { RootState } from 'store/store.ts';
import useReducerForForms from 'hooks/useReducerForForms';


const EditForm: React.FC = () => {
    
    const { selectedUnitId } = useSelector((state: RootState) => state.edit) as { selectedUnitId: string };
    const dispatch = useDispatch()

    const [event, updateEvent] = useReducerForForms();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    
        if(event.log === '' || event.pass === '') {
            updateEvent({
                type: 'errorUpdate',
                error: 'Fill in all fields'
            })
        } else if (event.log.length < 8 || event.pass.length < 8) {
            updateEvent({
                type: 'errorUpdate',
                error: 'Login and password must be longer than 8 characters'
            });
        } else {
            const unitToEdit = {id: selectedUnitId, log: event.log, pass: event.pass}
            dispatch(editContent(unitToEdit));
            dispatch(select(""))
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
            {selectedUnitId ? 
                <form onSubmit={handleSubmit}>
                    <input onChange={(e) => handleChange(e, "logUpdate")} value={event.log} name='log' placeholder="Login" type="text" />
                    <input onChange={(e) => handleChange(e, "passUpdate")} value={event.pass} name='pass' placeholder="Password" type="password" />
                    <input type="submit" value="EDIT"/>
                {event.error && <div className="error-message">{event.error}</div>}
                </form> : <span>Select what you want change</span>}
        </div>
    );
}
  
export default EditForm;