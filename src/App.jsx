import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
