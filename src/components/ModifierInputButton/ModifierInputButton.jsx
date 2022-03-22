import React from 'react';
import PropTypes from 'prop-types';
import { symbolStrings, makeMajor, makeMinor } from '../../lib/progressions';
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
      break;

    case 'minor-seventh':
      modifierString = '7';
      break;

    case 'diminished-seventh':
      modifierString = `${symbolStrings.dim}7`;
      break;

    case 'minor':
      modifierString = 'm';
      input.modifier = makeMinor;
      break;

    case 'major':
      modifierString = 'M';
      input.modifier = makeMajor;
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
