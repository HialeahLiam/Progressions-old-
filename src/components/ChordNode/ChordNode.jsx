import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './ChordNode.module.css';
import { convertSemitonesToChordString } from '../../lib/progressions';

export default function ChordNode({
  chord, onClick, position, radius,
}) {
  const handleInput = () => {
    onClick();
  };

  // const chordString = useMemo(() => convertSemitonesToChordString(chord), [chord]);

  return (
    <div
      className={styles.node}
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
      <span className={styles.symbol}>
        {' '}
        {convertSemitonesToChordString(chord).root}
      </span>
    </div>
  );
}

ChordNode.propTypes = {
  chord: PropTypes.arrayOf(PropTypes.number).isRequired,
  onClick: PropTypes.func.isRequired,
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
