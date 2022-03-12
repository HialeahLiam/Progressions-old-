import React, { useState } from 'react';
import CircleSelection from './CircleSelection';
import { Scale } from '../lib/progressions';
import InputDisplay from './InputDisplay';
import Header from './Header';
import ProgressionBar from './ProgressionBar';

const scale = Scale.MAJOR;

export default function Training() {
  const [input, setInput] = useState('');

  const inputHandler = (newInput) => {
    setInput((x) => `${x} - ${newInput}`);
  };

  return (
    <div>
      <Header>Progression Training</Header>
      <ProgressionBar />
      <InputDisplay input={input} />
      <CircleSelection scale={scale} sendInput={inputHandler} />
    </div>
  );
}
