import { useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TemporaryDrawer from '../../shared/MenuDrawer';
import SideBar from '../../SideBar/SideBar';
import styles from './MainLayout.module.css';

function MainLayout({ children }) {
  const smallWidth = useMediaQuery('(max-width:900px');

  return (
    <>
      {/* {!smallWidth && <SideBar />} */}
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <h1>Progressions</h1>
          </div>
          <TemporaryDrawer />
        </div>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </>
  );
}

export default MainLayout;
