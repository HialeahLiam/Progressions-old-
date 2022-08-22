import React from 'react';
import PropTypes from 'prop-types';

import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
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

      {progression.map((c, i) => (
        <React.Fragment key={i}>
          {i > 0 && <div className={styles.chord}>*</div>}
          <button
            type="button"
            className={`${styles.chord} ${i === selected && styles.selected}`}
            onClick={() => handleChordSelect(i)}
          >
            {convertSemitonesToChordString(c)}

          </button>
          {edit && (<button onClick={() => handleChordDelete(i)}>x</button>)}
        </React.Fragment>
      ))}
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
