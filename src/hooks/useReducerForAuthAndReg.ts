import { useReducer } from "react";
import { AuthAndRegState } from "types/states.ts";
import { EventAction } from "types/actions.ts";

const initialState: AuthAndRegState = {login: '', password: '', repPassword: '', error: ''};

const authAndRegReducer = (state: AuthAndRegState, action: EventAction) => {
    switch (action.type) {
        case 'loginUpdate':
            return { ...state, login: action.login };
        case 'passwordUpdate':
            return { ...state, password: action.password };
        case 'repPasswordUpdate':
            return { ...state, repPassword: action.repPassword };
        case 'errorUpdate':
            return { ...state, error: action.error };
        default:
            return state;
    }
};

const useReducerForAuthAndReg = (): [AuthAndRegState, (action: EventAction) => void] => {
  const [event, updateEvent] = useReducer(authAndRegReducer, initialState);

  return [event, updateEvent];
};

export default useReducerForAuthAndReg;