import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Button.css';

const classNames = {
  square: 'square',
  round: 'round',
};

function Button({ clickHandler, children, type }) {
  return (
    <button
      className={`${classNames[type]} button`}
      onClick={clickHandler}
      type="button"
    >
      {children}

    </button>
  );
}

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Button;
