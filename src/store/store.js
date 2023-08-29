import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice'; // Импортируем редюсер
import editReducer from './edit/edit.slice'; // Импортируем редюсер

const reducers = combineReducers({
    auth: authReducer,
    edit: editReducer

})

const store = configureStore({
    reducer: reducers
});

export default store;