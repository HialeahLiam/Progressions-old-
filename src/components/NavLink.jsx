import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/NavLink.css';

function NavLink({ target, children }) {
  return (
    <Link
      to={target}
      className="link"
    >
      {children}

    </Link>
  );
}

NavLink.propTypes = {
  target: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default NavLink;
