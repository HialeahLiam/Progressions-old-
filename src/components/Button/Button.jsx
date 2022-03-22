import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const classNames = {
  square: styles.square,
  round: styles.round,
};

function Button({ clickHandler, children, type }) {
  return (
    <button
      className={`${classNames[type]} ${styles.button}`}
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
