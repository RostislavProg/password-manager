import { combineReducers } from "redux";
import { accountsReducer } from "./accountsReducer";
import { changeUnitsReducer } from "./changeUnitsReducer"
import { addOrChangeReducer } from "./addOrChangeReducer"

export const rootReducer = combineReducers({
  accountsReducer,
  changeUnitsReducer,
  addOrChangeReducer
});