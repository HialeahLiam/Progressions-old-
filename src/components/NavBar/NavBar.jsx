import React from 'react';
// import PropTypes from 'prop-types';
import NavLink from '../NavLink/NavLink';
import Button from '../Button/Button';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <span className={styles.logo}>Progressions</span>
      <NavLink target="/training">training</NavLink>
      <NavLink target="">collections</NavLink>
      <NavLink target="">theory</NavLink>
      <NavLink target="/synthesizer">synthesizer</NavLink>
      <Button type="square" clickHandler={() => 5}>login</Button>
    </nav>
  );
}

NavBar.propTypes = {};

export default NavBar;
