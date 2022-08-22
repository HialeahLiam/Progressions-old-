/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, Stack } from '@mui/material';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/IntervalSelect.module.css';

const intervals = {
  first: [
    {
      interval: 2,
      text: 'M2',
    },
    {
      interval: 3,
      text: 'm3',
    },
    {
      interval: 4,
      text: 'M3',
    },
    {
      interval: 5,
      text: '4',
    },
  ],
  second: [
    {
      interval: 6,
      text: 'd5',
    },
    {
      interval: 7,
      text: '5',
    },
    {
      interval: 8,
      text: 'A5',
    },
  ],
  third: [
    {
      interval: -1,
      text: 'none',
    },
    {
      interval: 9,
      text: 'd7',
    },
    {
      interval: 10,
      text: 'm7',
    },
    {
      interval: 11,
      text: 'M7',
    },
  ],
};

const propTypes = {
  chord: PropTypes.arrayOf(PropTypes.number),
  handleChordModification: PropTypes.func,
};

const defaultProps = {
  chord: [],
  handleChordModification: () => {},
};

function IntervalSelect({ handleChordModification, chord }) {
  const chordIntervals = useMemo(() => {
    const arr = [];
    if (chord.length) {
      for (let i = 1; i <= 3; i++) {
        if (chord[i]) arr.push(chord[i] - chord[0]);
        else arr.push(-1);
      }
    }
    return arr;
  }, [chord]);

  function handleChordChange(chord) {
    while (chord.at(-1) === -1) chord.pop();
    handleChordModification(chord);
  }

  function handleFirstIntervalClick(interval) {
    const newChord = [...chord];
    newChord[1] = newChord[0] + interval;
    handleChordChange(newChord);
  }

  function handleSecondIntervalClick(interval) {
    const newChord = [...chord];
    newChord[2] = newChord[0] + interval;
    handleChordChange(newChord);
  }

  function handleThirdIntervalClick(interval) {
    const newChord = [...chord];
    if (interval === -1) newChord[3] = -1;
    else newChord[3] = newChord[0] + interval;
    handleChordChange(newChord);
  }

  return (
    <Box>
      <Stack direction="row">
        <Stack mr={2} borderTop="1px solid black">
          {/* <div className={styles.intervalButton} onClick={handleThirdIntervalClick(2)}>M2</div>
          <div className={styles.intervalButton} onClick={handleThirdIntervalClick(3)}>m3</div>
          <div className={styles.intervalButton} onClick={handleThirdIntervalClick(4)}>M3</div>
          <div className={styles.intervalButton} onClick={handleThirdIntervalClick(5)}>4</div> */}
          {intervals.first.map((o, i) => (
            <div
              className={`${styles.intervalButton} ${o.interval === chordIntervals[0] && styles.selected}`}
              key={o.interval}
              onClick={() => handleFirstIntervalClick(o.interval)}
              role="button"
            >
              {o.text}
            </div>
          ))}
        </Stack>
        <Stack mr={2} borderTop="1px solid black">
          {intervals.second.map((o, i) => (
            <div
              className={`${styles.intervalButton} ${o.interval === chordIntervals[1] && styles.selected}`}
              key={o.interval}
              onClick={() => handleSecondIntervalClick(o.interval)}
            >
              {o.text}
            </div>
          ))}
        </Stack>
        <Stack mr={2} borderTop="1px solid black">
          {intervals.third.map((o, i) => (
            <div
              className={`${styles.intervalButton} ${o.interval === chordIntervals[2] && styles.selected}`}
              key={o.interval}
              onClick={() => handleThirdIntervalClick(o.interval)}
            >
              {o.text}
            </div>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

IntervalSelect.propTypes = propTypes;
IntervalSelect.defaultProps = defaultProps;

export default IntervalSelect;
