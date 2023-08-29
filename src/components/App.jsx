import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/dachboard/Dashboard';
import Autorisation from './pages/autorisation/Autorisation'
import Registration from './pages/registration/Registration';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Autorisation />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/registration' element={<Registration />}></Route>
    </Routes>
  );
}

export default App;