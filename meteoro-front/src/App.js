import React from 'react';
import './App.css';
import {Router, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Usuario from './Usuario';
import Admin from './Admin';
import Presenca from './Presenca';

function App(){
  return(
    <dic><Login/></dic>
    /*
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </Router>
    */
  )
}
export default App;
