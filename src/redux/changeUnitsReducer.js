import { CREATE_UNITS } from "./type"
import { ADD_UNIT } from "./type"
import { DELETE_UNIT } from "./type"
import { CHANGE_UNIT } from "./type"


const initialState = {
    units: []
};

export const changeUnitsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_UNITS:
            return {
                units: action.units
            };
        case ADD_UNIT:
            return {
                ...state,
                units: state.units.concat(action.newUnit)
            };
        case DELETE_UNIT:
            return {
                ...state,
                units: state.units.filter(unit => 
                    unit.unitName + unit.unitLogin + unit.unitPassword !== 
                    action.unit.unitName + action.unit.unitLogin + action.unit.unitPassword
                )
            };
        case CHANGE_UNIT:
            const changedUnit = action.changedUnit;
            
            const changedUnits = state.units.map((unit) => {
                if (unit.unitName === changedUnit.unitName) {
                return changedUnit;
                } else {
                return unit;
                }
            });
            
            return {
                ...state,
                units: changedUnits
            };
        default:
            return state;
    }
  };

