import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './Login';
import Usuario from './Usuario';
import Admin from './Admin';
import Presenca from './Presenca';

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
