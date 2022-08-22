/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Scale } from '../../lib/progressions';
import ChordInput from '../RootInput/RootInput';
import Soundwave from '../Soundwave/Old_Soundwave';
import SoundwaveX from '../Soundwave/Soundwave';
import styles from './ReactComponents.module.css';

function ReactComponents() {
  const [chords, setChords] = useState([0, 71, 85, 90]);
  const [updatedChordTimes, setUpdatedChords] = useState([]);
  const [Xchords, setXchords] = useState([0, 71, 85, 90]);
  return (
    <div className={styles.container}>
      <h2>Soundwave representing YouTube audio</h2>
      <Soundwave
        edit
        updateChordTimes={(times) => setUpdatedChords(times)}
        chordStartTimes={chords}
        startTime={0}
        endTime={100}
      />
      <SoundwaveX
        edit
        updateChordTimes={(times) => setXchords(times)}
        chordStartTimes={Xchords}
        startTime={0}
        endTime={100}
      />
      <button
        onClick={() => setXchords((prev) => [...prev, prev.at(-1) + 5])}
      >
        add chord

      </button>

      <button
        onClick={() => setChords((prev) => prev.slice(0, -1))}
      >

        remove chord

      </button>

      <h2>Chord Input</h2>
      <ChordInput scale={Scale.MAJOR} />
    </div>
  );
}

export default ReactComponents;
