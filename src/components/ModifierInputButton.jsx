import React from 'react';
import PropTypes from 'prop-types';

function ModifierInputButton({ modifier, sendInput }) {
  let modifierString = '';

  const handleInput = () => {
    sendInput({
      root: '',
      chordSymbol: modifierString,
    });
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
  sendInput: PropTypes.func.isRequired,
  modifier: PropTypes.string.isRequired,
};

export default ModifierInputButton;
