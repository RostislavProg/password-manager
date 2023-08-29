import './ModeSwitch.css'
import { changeMode } from '../../../../../store/edit/edit.slice';
import { useDispatch } from 'react-redux';

const ModeSwitch = () => {

    const dispatch = useDispatch();

    return (
        <label className="switch">
            <input type="checkbox" onChange={() => dispatch(changeMode())} />
            <span className="slider">
                <span className="slider-add">ADD</span>
                <span className="slider-edit">EDIT</span>
            </span>
        </label>
    );
};

export default ModeSwitch;