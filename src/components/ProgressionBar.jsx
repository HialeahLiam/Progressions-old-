import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import '../styles/ProgressionBar.css';

function ProgressionBar({
  incorrectSubmissions, submitHandler, input, amountOfSlots, submit,
}) {
  const [inputs, setInputs] = useState([input]);
  const [classNames, setClasses] = useState([]);
  const [currentlySelectedSlot, selectSlot] = useState(0);
  // TODO: set slots as state. When proceding to next progression, otherwise, ProgressionBar will
  // not re-render
  const slots = [];

  const handleSelection = (i) => {
    selectSlot(i);
  };

  for (let i = 0; i < amountOfSlots; i++) {
    slots.push(
      <div
        className={`slot ${classNames[i]} ${currentlySelectedSlot === i ? 'selected-slot' : null}`}
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
    newInput[currentlySelectedSlot] = i;
    setInputs(newInput);
    if (currentlySelectedSlot < amountOfSlots - 1) selectSlot((slot) => slot + 1);
  };

  useEffect(() => {
    if (input) handleInput(input);
  }, [input]);

  useEffect(() => {
    const classes = [];
    incorrectSubmissions.forEach((i) => {
      classes[i] = 'incorrect';
    });
    setClasses(classes);
  }, [incorrectSubmissions]);

  return (
    <div className="bar">
      <Button type="round" clickHandler={() => { }}>play</Button>
      <div className="container">
        {slots}
      </div>
      {submit
        ? <Button type="round" clickHandler={() => {}}>next</Button>
        : <Button type="round" clickHandler={() => submitHandler(inputs)}>submit</Button>}
    </div>
  );
}

ProgressionBar.propTypes = {
  incorrectSubmissions: PropTypes.arrayOf(PropTypes.number),
  submitHandler: PropTypes.func.isRequired,
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
