import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Header.css';

function Header({ children }) {
  return (
    <header className="header">
      <span className="text">{children}</span>
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
