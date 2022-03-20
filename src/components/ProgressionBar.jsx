import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import '../styles/ProgressionBar.css';

function ProgressionBar({
  incorrectSubmissions, submitHandler,
  nextHandler,
  playHandler, input, amountOfSlots, submit,
}) {
  const [inputs, setInputs] = useState([]);
  const [currentlySelectedSlot, selectSlot] = useState(0);
  const [selectedByUser, setUserSelect] = useState(false);
  const [reachedFinalSlot, setReachedFinalSlot] = useState(false);

  const slots = [];
  const slotClasses = [];

  const handleSelection = (i) => {
    setUserSelect(true);
    selectSlot(i);
  };

  const handleNext = () => {
    setInputs([]);
    selectSlot(0);
    setUserSelect(false);
    setReachedFinalSlot(false);
    nextHandler();
  };

  for (let i = 0; i < amountOfSlots; i++) {
    slotClasses.push(
      classNames(
        'slot',
        {
          'selected-slot': !submit && currentlySelectedSlot === i,
          incorrect: incorrectSubmissions.find((e) => e === i),
        },
      ),
    );
    slots.push(
      <div
        className={slotClasses[i]}
        key={i}
        onClick={() => handleSelection(i)}
        onFocus={() => handleSelection(i)}
        onKeyPress={() => handleSelection(i)}
        tabIndex={0}
        role="button"
      >
        {inputs[i]
          ? (
            <>
              {inputs[i].root}
              <span className="symbol">{inputs[i].chordSymbol}</span>
            </>
          )
          : ''}
      </div>,
    );
  }

  const handleInput = (i) => {
    const newInput = [...inputs];
    // chord symbol input, not root input
    if (i.root.length < 1) {
      let target = 0;
      if (selectedByUser || reachedFinalSlot) {
        target = currentlySelectedSlot;
      } else {
        target = currentlySelectedSlot - 1;
      }
      if (newInput[target]) newInput[target].chordSymbol = i.chordSymbol;
    } else {
      setUserSelect(false);

      newInput[currentlySelectedSlot] = i;
      setInputs(newInput);
      if (currentlySelectedSlot < amountOfSlots - 1) {
        selectSlot((slot) => slot + 1);
        setReachedFinalSlot(false);
      } else {
        setReachedFinalSlot(true);
      }
    }
  };

  const handleSubmit = () => {
    if (inputs.length === amountOfSlots) {
      submitHandler(inputs);
    }
  };

  useEffect(() => {
    if (input) handleInput(input);
  }, [input]);

  return (
    <div className="bar">
      <Button type="round" clickHandler={playHandler}>play</Button>
      <div className="container">
        {slots}
      </div>
      {submit
        ? <Button type="round" clickHandler={handleNext}>next</Button>
        : <Button type="round" clickHandler={handleSubmit}>submit</Button>}
    </div>
  );
}

ProgressionBar.propTypes = {
  incorrectSubmissions: PropTypes.arrayOf(PropTypes.number),
  submitHandler: PropTypes.func.isRequired,
  playHandler: PropTypes.func.isRequired,
  nextHandler: PropTypes.func.isRequired,
  input: PropTypes.shape({
    root: PropTypes.string,
    chordSymbol: PropTypes.string,
  }),
  amountOfSlots: PropTypes.number.isRequired,
  submit: PropTypes.bool.isRequired,
};

ProgressionBar.defaultProps = {
  incorrectSubmissions: [],
  input: {
    root: '',
    chordSymbol: '',
  },
};

export default ProgressionBar;
