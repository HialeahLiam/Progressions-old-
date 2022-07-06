import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import AuthProvider from './contexts/AuthContext';

function App() {
  return (
    <div className="whole">
      <AuthProvider>
        <NavBar />
        <div className="main">
          <div className="logo">
            <h1>Progressions</h1>
          </div>

          <div className="content">
            <Outlet />
          </div>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
