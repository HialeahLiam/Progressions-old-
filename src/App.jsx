import { ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import MainLayout from './components/layouts/MainLayout/MainLayout';
import SideBar from './components/SideBar/SideBar';
import AuthProvider from './contexts/AuthContext';
import theme from './MuiTheme';

function App() {
  return (
    <div className="whole">
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </ThemeProvider>

      </AuthProvider>
    </div>
  );
}

export default App;
