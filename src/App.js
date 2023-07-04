import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard';
import Autorisation from './Autorisation'
import Registration from './Registration';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/' element={<Autorisation />}></Route>
      <Route path='/registration' element={<Registration />}></Route>
    </Routes>
  );
}

export default App;