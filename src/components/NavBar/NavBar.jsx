import React from 'react';
// import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import NavLink from '../NavLink/NavLink';
import Button from '../Button/Button';
import styles from './NavBar.module.css';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <span className={styles.logo}>Progressions</span>
      <NavLink target="/training">training</NavLink>
      <NavLink target="">collections</NavLink>
      <NavLink target="">theory</NavLink>
      <NavLink target="/synthesizer">synthesizer</NavLink>
      <Button
        type="square"
        clickHandler={() => {
          navigate('/login', { state: { from: location } });
        }}
      >
        login

      </Button>
    </nav>
  );
}

NavBar.propTypes = {};

export default NavBar;
