import React from 'react';
// import PropTypes from 'prop-types';
import Button from './Button';
import '../styles/ProgressionBar.css';

function ProgressionBar() {
  return (
    <div className="bar">
      <Button type="round" clickHandler={() => null}>play</Button>
      <Button type="round" clickHandler={() => null}>submit</Button>
    </div>
  );
}

ProgressionBar.propTypes = {};

export default ProgressionBar;
