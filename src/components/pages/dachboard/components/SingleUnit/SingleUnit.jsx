import { useState } from "react";
import { useDispatch } from "react-redux";
import deleteImg from "../../../../../icons/delete.png"
import editImg from "../../../../../icons/edit.png"
import { deleteContent } from "../../../../../store/auth/auth.slice";

import './SingleUnit.css';
import { select } from "../../../../../store/edit/edit.slice";



const SingleUnit = ({service, log, pass, id, editMode}) => {

    const [showPass, setShowPass] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="unit">
            <div className="unit-info">
            <p>{service}</p>
            <p>
                Login: {log}; Password: <span onClick={() => setShowPass(!showPass)}>
                                           {showPass ? pass : "*".repeat(pass.length)}
                                       </span>
            </p>
            </div>
            <div onClick={() => {editMode ? dispatch(select(id)) : dispatch(deleteContent(id))}} className="unit-delete">
                <img src={editMode ? editImg : deleteImg} style={editMode ? {padding: "14px"} : {padding: "8px"}}alt="delete" />
            </div>
        </div>
    );
}
  
export default SingleUnit;