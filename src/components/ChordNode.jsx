import React from 'react';
import '../styles/ChordNode.css';
import PropTypes from 'prop-types';

export default function ChordNode({
  chord, sendInput, position, radius,
}) {
  const handleInput = () => {
    // Send a copy of chord object so ProgressionBar can manipulate it without
    // affecting the chord object here
    sendInput({ ...chord });
  };

  return (
    <div
      className="node"
      onClick={handleInput}
      onKeyPress={handleInput}
      tabIndex="0"
      role="button"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        height: `${2 * radius}px`,
        width: `${2 * radius}px`,
      }}
    >
      {chord.root}
      <span className="symbol">
        {' '}
        {chord.chordSymbol}
      </span>
    </div>
  );
}

ChordNode.propTypes = {
  chord: PropTypes.shape({
    root: PropTypes.string,
    chordSymbol: PropTypes.string,
  }).isRequired,
  sendInput: PropTypes.func.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  radius: PropTypes.number,
};

ChordNode.defaultProps = {
  position: { x: 0, y: 0 },
  radius: 33,
};
