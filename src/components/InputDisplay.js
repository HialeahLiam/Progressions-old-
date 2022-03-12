import React from 'react';
import PropTypes from 'prop-types';

export default function InputDisplay({ input }) {
  return (
    <div>{input}</div>
  );
}

InputDisplay.propTypes = {
  input: PropTypes.string.isRequired,
};
