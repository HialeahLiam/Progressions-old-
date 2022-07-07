/* eslint-disable react/no-array-index-key */
import React from 'react';
// import PropTypes from 'prop-types';
import styles from './ProgressionChords.module.css';

// const propTypes = {
//   chords: PropTypes.arrayOf(
//     PropTypes.arrayOf(PropTypes.number),
//   ),
// };

const defaultProps = {
  chords: [],
};

const chords = ['I', 'II', 'III', 'IV'];

function ProgressionChords() {
  return (
    <div className={styles.container}>
      <button type="button" className={styles.playButton}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 3L19 12L5 21V3Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      </button>

      {chords.map((c, i) => (
        <React.Fragment key={i}>
          {i > 0 && <div className={styles.chord}>*</div>}
          <div className={styles.chord}>{c}</div>
        </React.Fragment>
      ))}
    </div>
  );
}

// ProgressionChords.propTypes = propTypes;
ProgressionChords.defaultProps = defaultProps;

export default ProgressionChords;
