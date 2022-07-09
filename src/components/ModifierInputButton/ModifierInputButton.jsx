import React from 'react';
import PropTypes from 'prop-types';
import {

  SymbolStrings,
  makeMajor,
  makeMinor,
  addMajorSeventh,
  addSeventh,
  addDiminishedSeventh,
  makeAugmented,
  makeDiminished,
} from '../../lib/progressions';
import styles from './ModifierInputButton.module.css';

function ModifierInputButton({ modifier, handler }) {
  const input = {};
  let modifierString = '';

  const handleInput = () => {
    // sendInput({
    //   root: null,
    //   chordSymbol: modifierString,
    // });
    handler(input);
  };

  switch (modifier) {
    case 'major-seventh':
      modifierString = 'M7';
      input.modifier = addMajorSeventh;
      break;

    case 'seventh':
      modifierString = '7';
      input.modifier = addSeventh;
      break;

    case 'half-diminished-seventh':
      modifierString = `${SymbolStrings.halfDim}7`;
      input.modifier = addDiminishedSeventh;
      break;

    case 'minor':
      modifierString = 'm';
      input.modifier = makeMinor;
      break;

    case 'major':
      modifierString = 'M';
      input.modifier = makeMajor;
      break;

    case 'aug':
      modifierString = SymbolStrings.aug;
      input.modifier = makeAugmented;
      break;

    case 'dim':
      modifierString = SymbolStrings.dim;
      input.modifier = makeDiminished;
      break;

    default:
      break;
  }

  return (
    <button
      type="button"
      onClick={handleInput}
    >
      <span className={styles.symbol}>{modifierString}</span>

    </button>
  );
}

ModifierInputButton.propTypes = {
  handler: PropTypes.func.isRequired,
  modifier: PropTypes.string.isRequired,
};

export default ModifierInputButton;
