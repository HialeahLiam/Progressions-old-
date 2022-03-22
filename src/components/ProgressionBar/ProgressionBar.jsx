/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button/Button';
import styles from './ProgressionBar.module.css';

const propTypes = {
  incorrectSubmissions: PropTypes.arrayOf(PropTypes.number),
  submitHandler: PropTypes.func.isRequired,
  playHandler: PropTypes.func.isRequired,
  nextHandler: PropTypes.func.isRequired,
  input: PropTypes.oneOfType([
    PropTypes.shape({
      root: PropTypes.string,
      chordSymbol: PropTypes.string,
    }),
    PropTypes.shape({
      modifier: PropTypes.func,
    }),
  ]),
  amountOfSlots: PropTypes.number.isRequired,
  submit: PropTypes.bool.isRequired,
};

const defaultProps = {
  incorrectSubmissions: [],
  input: {
    root: '',
    chordSymbol: '',
  },
};

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
        styles.slot,
        {
          [styles.selectedSlot]: !submit && currentlySelectedSlot === i,
          [styles.incorrect]: incorrectSubmissions.find((e) => e === i),
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
              <span className={styles.symbol}>{inputs[i].chordSymbol}</span>
            </>
          )
          : ''}
      </div>,
    );
  }

  const handleInput = (input) => {
    const newInput = [...inputs];

    // Checking if input is a new chord or a chord modifier
    if (input.modifier) {
      let target = 0;

      // Logic for selecting which chord to modify
      if (selectedByUser || reachedFinalSlot) {
        target = currentlySelectedSlot;
      } else {
        target = currentlySelectedSlot - 1;
      }
      const chordToModify = newInput[target];

      // Actual modification
      if (chordToModify) {
        newInput[target] = input.modifier(chordToModify);
      }
    } else {
      setUserSelect(false);

      newInput[currentlySelectedSlot] = input;
      if (currentlySelectedSlot < amountOfSlots - 1) {
        selectSlot((slot) => slot + 1);
        setReachedFinalSlot(false);
      } else {
        setReachedFinalSlot(true);
      }
    }
    console.log('New chord: ');
    console.log(newInput);
    // Updating inputs with new chord object or modified chord object
    setInputs(newInput);
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
    <div className={styles.bar}>
      <Button type="round" clickHandler={playHandler}>play</Button>
      <div className={styles.container}>
        {slots}
      </div>
      {submit
        ? <Button type="round" clickHandler={handleNext}>next</Button>
        : <Button type="round" clickHandler={handleSubmit}>submit</Button>}
    </div>
  );
}

ProgressionBar.propTypes = propTypes;

ProgressionBar.defaultProps = defaultProps;

export default ProgressionBar;
