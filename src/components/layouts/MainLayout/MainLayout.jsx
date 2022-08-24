import React, { useEffect, useState } from 'react';
import SideBar from '../../SideBar/SideBar';
import styles from './MainLayout.module.css';

function MainLayout({ children }) {
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
    <>
      {breakpoint !== 'sm' && <SideBar />}
      <div className={styles.main}>
        <div className={styles.logo}>
          <h1>Progressions</h1>
        </div>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </>
  );
}

export default MainLayout;
