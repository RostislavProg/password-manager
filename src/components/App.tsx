import React, { useEffect } from 'react';
import Dashboard from './pages/dachboard/Dashboard.tsx';
import Autorisation from './pages/autorisation/Autorisation.tsx'
import Registration from './pages/registration/Registration.tsx';
import { Route, Routes } from 'react-router-dom';
import { jsonContent } from "store/auth/auth.slice.ts";
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { parseLocalStorageItem } from 'hooks/useParseLSItem.ts';

const App = () => {
  
  const jsonUserID = parseLocalStorageItem('userId');
  const jsonAccounts = parseLocalStorageItem('accounts');
  const jsonAccountsContent = parseLocalStorageItem('accountsContent')
    
  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch(jsonContent({ jsonUserID, jsonAccounts, jsonAccountsContent }));
  }, []);


  return (
    <Routes>
      <Route path='/' element={<Autorisation />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/registration' element={<Registration />}></Route>
    </Routes>
  );
}

export default App;