// Type imports
import { AUTORISATION } from "./type"
import { REGISTRATION } from "./type"
import { CREATE_UNITS } from "./type"
import { CHANGE_CURRENT } from "./type"
import { ADD_UNIT } from "./type"
import { DELETE_UNIT } from "./type"
import { SAVE_UNITS } from "./type"
import { CHANGE_CHANGESTATE } from "./type"
import { CHANGE_UNIT } from "./type"


// actions

export function autorisation(login){
    return{
        type: AUTORISATION,
        login
    }
}

export function registration(login, password){
    return{
        type: REGISTRATION,
        login,
        password
    }
}

export function createUnits(units){
    return{
        type: CREATE_UNITS,
        units
    }
}

export function changeCurrent(){
    return{
        type: CHANGE_CURRENT
    }
}

export function addUnit(newUnit){
    return{
        type: ADD_UNIT,
        newUnit
    }
}

export function deleteUnit(unit){
    return{
        type: DELETE_UNIT,
        unit
    }
}

export function saveUnits(newUnits){
    return{
        type: SAVE_UNITS,
        newUnits
    }
}

export function changeChangeState(name){
    return{
        type: CHANGE_CHANGESTATE,
        name
    }
}

export function changeUnit(changedUnit) {
    return {
      type: CHANGE_UNIT,
      changedUnit
    };
  }