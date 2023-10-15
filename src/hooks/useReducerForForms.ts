import { useReducer } from "react";
import { FormsState } from "types/states.ts";
import { EventFormAction } from "types/actions.ts";

const initialState: FormsState = { service: '', log: '', pass: '', error: '' };

const formReducer = (state: FormsState, action: EventFormAction) => {
  switch (action.type) {
    case 'serviceUpdate':
      return { ...state, service: action.service || '' };
    case 'logUpdate':
      return { ...state, log: action.log || '' };
    case 'passUpdate':
      return { ...state, pass: action.pass || '' };
    case 'errorUpdate':
      return { ...state, error: action.error || '' };
    case 'reset':
      return { ...initialState };
    default:
      return state;
  }
};

const useReducerForForms = (): [FormsState, (action: EventFormAction) => void] => {
  const [event, updateEvent] = useReducer(formReducer, initialState);

  return [event, updateEvent];
};

export default useReducerForForms;