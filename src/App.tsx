import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Wallet from './pages/Wallet/Wallet';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/carteira" element={ <Wallet /> } />
    </Routes>
  );
}

export default App;
