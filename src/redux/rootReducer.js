import { combineReducers } from "redux";
import { accountsReducer } from "./reducers/accountsReducer";
import { changeUnitsReducer } from "./reducers/changeUnitsReducer"
import { addOrChangeReducer } from "./reducers/addOrChangeReducer"

export const rootReducer = combineReducers({
  accountsReducer,
  changeUnitsReducer,
  addOrChangeReducer
});