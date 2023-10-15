import './ModeSwitch.css';

import React from 'react';
import { useDispatch } from 'react-redux';
import { changeMode } from 'store/edit/edit.slice.ts';

const ModeSwitch: React.FC = () => {

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