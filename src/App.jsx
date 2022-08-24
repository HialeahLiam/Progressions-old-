import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import MainLayout from './components/layouts/MainLayout/MainLayout';
import SideBar from './components/SideBar/SideBar';
import AuthProvider from './contexts/AuthContext';

function App() {
  // const [breakpoint, setBreakpoint] = useState();

  // useEffect(() => {
  //   const mediumMql = window.matchMedia('(min-width: 900px)');
  //   if (mediumMql.matches) setBreakpoint('md');
  //   else setBreakpoint('sm');
  //   mediumMql.onchange = (e) => {
  //     if (e.matches) setBreakpoint('md');
  //     else setBreakpoint('sm');
  //   };
  // }, []);

  return (
    <div className="whole">
      <AuthProvider>
        <MainLayout>
          <Outlet />
        </MainLayout>

      </AuthProvider>
    </div>
  );
}

export default App;
