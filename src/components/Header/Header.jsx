import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

function Header({ children }) {
  return (
    <header className={styles.header}>
      <span className={styles.text}>{children}</span>
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
