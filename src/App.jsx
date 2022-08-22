import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import SideBar from './components/SideBar/SideBar';
import AuthProvider from './contexts/AuthContext';

function App() {
  const [breakpoint, setBreakpoint] = useState();

  useEffect(() => {
    const mediumMql = window.matchMedia('(min-width: 900px)');
    if (mediumMql.matches) setBreakpoint('md');
    else setBreakpoint('sm');
    mediumMql.onchange = (e) => {
      if (e.matches) setBreakpoint('md');
      else setBreakpoint('sm');
    };
  }, []);

  return (
    <div className="whole">
      <AuthProvider>
        {breakpoint !== 'sm' && <SideBar />}
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
