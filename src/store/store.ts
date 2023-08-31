import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice.ts';
import editReducer from './edit/edit.slice.ts';

const reducers = combineReducers({
  auth: authReducer,
  edit: editReducer
});

const store = configureStore({
  reducer: reducers
});

export type RootState = ReturnType<typeof reducers>;
export default store;