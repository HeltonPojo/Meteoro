import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './components/pages/Login';
import Usuario from './components/pages/Usuario';
import Admin from './components/pages/Admin';
import Presenca from './components/pages/Presenca';

function App(){
  return(
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/membro" element={<Usuario />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/presenca" element={<Presenca />} />
    </Routes>
  )
}
export default App;
