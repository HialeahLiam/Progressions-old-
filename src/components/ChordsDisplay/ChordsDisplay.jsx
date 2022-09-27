import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import CircleIcon from '@mui/icons-material/Circle';
import styles from './ChordsDisplay.module.css';
import { convertSemitonesToChordString } from '../../lib/progressions';

const propTypes = {
  progression: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  handleChordSelect: PropTypes.func,
  handleChordDelete: PropTypes.func,
  handleChordAdd: PropTypes.func,
  selected: PropTypes.number,
  edit: PropTypes.bool,
};

const defaultProps = {
  progression: [],
  selected: -1,
  handleChordSelect: null,
  handleChordAdd: null,
  handleChordDelete: null,
  edit: false,
};

/**
 * Converts chord arrays to strings and displays them.
*/
function ChordsDisplay({
  edit, progression, handleChordSelect, selected, handleChordDelete, handleChordAdd,
}) {
  return (
    <div className={styles.container}>

      {progression.map((c, i) => {
        const chordString = convertSemitonesToChordString(c);
        return (
          <React.Fragment key={i}>
            {i > 0 && <CircleIcon sx={{ px: 0.3, mx: 2 }} fontSize="sm" />}
            <button
              type="button"
              className={`${styles.chord} ${i === selected && styles.selected}`}
              onClick={() => handleChordSelect(i)}
            >
              <span className={styles.root}>{chordString.root}</span>
              <span className={styles.modifier}>{chordString.modifier}</span>

            </button>
            {edit && (
            <button className={styles.clear} aria-label="Clear chord" onClick={() => handleChordDelete(i)}>
              <ClearIcon color="error" fontSize="sm" />
            </button>
            )}
          </React.Fragment>
        );
      })}
      {edit && (
      <IconButton
        size="small"
        onClick={handleChordAdd}
      >
        <Add fontSize="inherit" />
      </IconButton>
      )}
    </div>
  );
}

ChordsDisplay.propTypes = propTypes;
ChordsDisplay.defaultProps = defaultProps;

export default ChordsDisplay;
