import React from 'react';
import '../styles/ChordNode.css';
import PropTypes from 'prop-types';

export default function ChordNode({
  chord, sendInput, position, radius,
}) {
  const handleInput = () => {
    sendInput(chord);
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
      {chord}
    </div>
  );
}

ChordNode.propTypes = {
  chord: PropTypes.string.isRequired,
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
