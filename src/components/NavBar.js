import React from 'react';
// import PropTypes from 'prop-types';
import NavLink from './NavLink';
import Button from './Button';
import '../styles/NavBar.css';

function NavBar() {
  return (
    <nav className="nav">
      <span className="logo">Progressions</span>
      <NavLink target="">training</NavLink>
      <NavLink target="">collections</NavLink>
      <NavLink target="">theory</NavLink>
      <Button type="square" clickHandler={() => 5}>login</Button>
    </nav>
  );
}

NavBar.propTypes = {};

export default NavBar;
