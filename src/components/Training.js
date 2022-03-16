import React, { useState, useEffect } from 'react';
import CircleSelection from './CircleSelection';
import { Scale, getDiatonicChords } from '../lib/progressions';
import Header from './Header';
import ProgressionBar from './ProgressionBar';

const scale = Scale.MAJOR;

const diatonicMajorScaleChords = getDiatonicChords(scale);

const progression = [diatonicMajorScaleChords[0],
  diatonicMajorScaleChords[1],
  diatonicMajorScaleChords[2],
  diatonicMajorScaleChords[3]];

export default function Training() {
  // eslint-disable-next-line no-unused-vars
  const [input, setInput] = useState('');
  const [incorrectChords, setIncorrectChords] = useState([]);

  const inputHandler = (newInput) => {
    setInput(newInput);
  };

  // eslint-disable-next-line no-unused-vars
  const submitHandler = (inputtedChords) => {
    console.log('checking submission ...');
    const incorrectIndices = [];
    for (let i = 0; i < progression.length; i++) {
      if (inputtedChords[i] !== progression[i]) {
        incorrectIndices.push(i);
      }
    }
    setIncorrectChords(incorrectIndices);
  };

  useEffect(() => {
    // Resets input to empty string to trigger prop change  in case same chord is inputted.
    // Otherwise, ProgressionBar won't consider consecutive clicks of the same chord.
    setInput('');
  }, [input]);

  return (
    <div>
      <Header>Progression Training</Header>
      <ProgressionBar
        amountOfSlots={progression.length}
        submitHandler={submitHandler}
        input={input}
        incorrectSubmissions={incorrectChords}
      />
      <CircleSelection scale={scale} sendInput={inputHandler} />
    </div>
  );
}
