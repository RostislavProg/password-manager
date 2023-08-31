import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/dachboard/Dashboard';
import Autorisation from './pages/autorisation/Autorisation'
import Registration from './pages/registration/Registration';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import { jsonContent } from "../store/auth/auth.slice";
import { useDispatch } from 'react-redux';


const App = () => {

  const jsonUserID = JSON.parse(localStorage.getItem('userId'));
  const jsonAccounts = JSON.parse(localStorage.getItem('accounts'));
  const jsonAccountsContent = JSON.parse(localStorage.getItem('accountsContent'));
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(jsonContent({jsonUserID, jsonAccounts, jsonAccountsContent}))
  }, [])


  return (
    <Routes>
      <Route path='/' element={<Autorisation />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/registration' element={<Registration />}></Route>
    </Routes>
  );
}

export default App;