import React from 'react';
import PropTypes from 'prop-types';
import '../styles/NavLink.css';

function NavLink({ target, children }) {
  return (
    <a
      href={target}
      className="link"
    >
      {children}

    </a>
  );
}

NavLink.propTypes = {
  target: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default NavLink;
