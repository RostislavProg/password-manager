import { useDispatch } from "react-redux"
import deleteImg from "./icons/plus.png"
import { deleteUnit, changeChangeState } from './redux/actions';
import { useState } from "react";


const SingleUnit = ({ unitName ,unitLogin, unitPassword }) => {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleDelete = () =>{
        dispatch(deleteUnit({ unitName ,unitLogin, unitPassword }));
    }

    const handleShowChange = () =>{
        setShow(!show);
    }

    const handleDBClick = () => {
        dispatch(changeChangeState(unitName));
    }

    return (
        <div onDoubleClick={handleDBClick} className="unit">
            <div className="unit-info">
            <p>{unitName}</p>
            <p>
                Login: {unitLogin}; <span onClick={handleShowChange}>
                Password: {show ? unitPassword : "*".repeat(unitPassword.length)}</span>
            </p>
            </div>
            <div className="unit-delete">
            <img onClick={handleDelete} src={deleteImg} alt="delete" />
            </div>
        </div>
    );
}
  
export default SingleUnit;