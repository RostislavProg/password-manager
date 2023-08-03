import { CHANGE_CHANGESTATE } from "../types/type";

const initialState = {
    changeState: false,
    changeName: ''
};

export const addOrChangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CHANGESTATE:
            return {
                ...state,
                changeState: !state.changeState, 
                changeName: action.name
            };
        default:
            return state;
    }
  };

