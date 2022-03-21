import React from 'react';
import PropTypes from 'prop-types';
import { makeMinor } from '../lib/progressions';

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
      modifierString = '\ue8707';
      break;

    case 'minor':
      modifierString = 'm';
      input.modifier = makeMinor;
      break;

    default:
      break;
  }

  return (
    <button
      type="button"
      onClick={handleInput}
    >
      {modifierString}

    </button>
  );
}

ModifierInputButton.propTypes = {
  handler: PropTypes.func.isRequired,
  modifier: PropTypes.string.isRequired,
};

export default ModifierInputButton;
