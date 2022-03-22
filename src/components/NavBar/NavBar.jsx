import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
      <Link to="signup"><Button type="square" clickHandler={() => 5}>login</Button></Link>
    </nav>
  );
}

NavBar.propTypes = {};

export default NavBar;
