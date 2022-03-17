import React, { useState, useEffect } from 'react';
import CircleSelection from '../components/CircleSelection';
import { Scale, getDiatonicChords } from '../lib/progressions';
import Header from '../components/Header';
import ProgressionBar from '../components/ProgressionBar';

const scale = Scale.MAJOR;

const diatonicMajorScaleChords = getDiatonicChords(scale);

const progression = [diatonicMajorScaleChords[0],
  diatonicMajorScaleChords[1],
  diatonicMajorScaleChords[2],
  diatonicMajorScaleChords[6]];

export default function Training() {
  const [input, setInput] = useState(null);
  const [incorrectChords, setIncorrectChords] = useState([]);
  const [isSubmitting, setSubmit] = useState(false);

  const inputHandler = (newInput) => {
    if (!isSubmitting) setInput(newInput);
  };

  const submitHandler = (inputtedChords) => {
    setSubmit(true);
    const incorrectIndices = [];
    for (let i = 0; i < progression.length; i++) {
      if (inputtedChords[i] !== progression[i]) {
        incorrectIndices.push(i);
      }
    }
    setIncorrectChords(incorrectIndices);
  };

  useEffect(() => {
    // resets ProgressionBar's input prop to null to allow consecutive input
    // of previous chord
    setInput(null);
  }, [input]);

  return (
    <div>
      <Header>Progression Training</Header>
      <ProgressionBar
        amountOfSlots={progression.length}
        submitHandler={submitHandler}
        input={input}
        incorrectSubmissions={incorrectChords}
        submit={isSubmitting}
      />
      <CircleSelection scale={scale} sendInput={inputHandler} />
    </div>
  );
}
