import React, { useState, useEffect, useRef } from 'react';
import CircleSelection from '../components/CircleSelection';
import { Scale, getDiatonicChords } from '../lib/progressions';
import Header from '../components/Header';
import ProgressionBar from '../components/ProgressionBar';
import Button from '../components/Button';

const scale = Scale.MAJOR;

const diatonicMajorScaleChords = getDiatonicChords(scale);

const PROGRESSION = [diatonicMajorScaleChords[0],
  diatonicMajorScaleChords[1],
  diatonicMajorScaleChords[2],
  diatonicMajorScaleChords[6]];

const NOTE_FREQ = [];
for (let octave = 0; octave < 9; octave++) {
  NOTE_FREQ[octave] = [];
  // 0 is C
  const kFactor = 2 ** (1 / 12);
  for (let note = 0; note < 12; note++) {
    NOTE_FREQ[octave][note] = 27.5;
    if (!(octave === 0 && note < 9)) {
      const prevNote = note === 0
        ? NOTE_FREQ[octave - 1][11]
        : NOTE_FREQ[octave][note - 1];
      NOTE_FREQ[octave][note] = prevNote * kFactor;
    }
  }
}

// const ROOT = 0;

export default function Training() {
  const [input, setInput] = useState(null);
  const [incorrectChords, setIncorrectChords] = useState([]);
  const [isSubmitting, setSubmit] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [training, setTraining] = useState(false);

  const mainGainNode = useRef();
  const audioContext = useRef();
  const oscillators = useRef([]);
  const playbackIntervalId = useRef();

  const inputHandler = (newInput) => {
    if (!isSubmitting) setInput(newInput);
  };

  const submitHandler = (inputtedChords) => {
    setSubmit(true);
    const incorrectIndices = [];
    for (let i = 0; i < PROGRESSION.length; i++) {
      if (inputtedChords[i] !== PROGRESSION[i]) {
        incorrectIndices.push(i);
      }
    }
    setIncorrectChords(incorrectIndices);
  };

  const volumeChangeHandler = (event) => {
    setVolume(event.target.value);
    mainGainNode.gain.value = event.target.value;
  };

  const playProgression = (prog) => {
    clearInterval(playbackIntervalId.current);

    mainGainNode.current.connect(audioContext.current.destination);
    prog[0].forEach((freq, index) => {
      oscillators.current[index].frequency.value = freq;
    });

    let progCount = 1;

    playbackIntervalId.current = setInterval(() => {
      if (progCount < prog.length) {
        prog[progCount].forEach((freq, index) => {
          oscillators.current[index].frequency.value = freq;
        });
        progCount++;
      } else {
        mainGainNode.current.disconnect();
        clearInterval(playbackIntervalId.current);
      }
    }, 500);

    console.log(prog);
  };

  const playHandler = () => {
    console.log('playing progression');
    playProgression([
      [NOTE_FREQ[3][0], NOTE_FREQ[3][4], NOTE_FREQ[3][7]],
      [NOTE_FREQ[3][2], NOTE_FREQ[3][5], NOTE_FREQ[3][9]],
      [NOTE_FREQ[3][4], NOTE_FREQ[3][7], NOTE_FREQ[3][11]],
      [NOTE_FREQ[3][5], NOTE_FREQ[3][9], NOTE_FREQ[4][0]],

    ]);
  };

  const beginTrainingHandler = () => {
    const gainNode = new GainNode(audioContext.current, { gain: volume });
    mainGainNode.current = gainNode;
    oscillators.current.forEach((osc) => {
      osc.connect(mainGainNode.current);
      osc.start();
    });
    setTraining(true);
  };

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    audioContext.current = context;
    oscillators.current[0] = new OscillatorNode(audioContext.current, {
      type: 'square',
    });
    oscillators.current[1] = new OscillatorNode(audioContext.current, {
      type: 'square',
    });
    oscillators.current[2] = new OscillatorNode(audioContext.current, {
      type: 'square',
    });
  }, []);

  useEffect(() => {
    // resets ProgressionBar's input prop to null to allow consecutive input
    // of previous chord
    setInput(null);
  }, [input]);

  return (
    <div>
      <Header>Progression Training</Header>
      {training
        ? (
          <>
            <ProgressionBar
              amountOfSlots={PROGRESSION.length}
              submitHandler={submitHandler}
              playHandler={playHandler}
              input={input}
              incorrectSubmissions={incorrectChords}
              submit={isSubmitting}
            />
            <input type="range" min="0.0" max="1.0" value={volume} onChange={volumeChangeHandler} step="0.01" />
            <CircleSelection scale={scale} sendInput={inputHandler} />
          </>
        )
        : <Button type="round" clickHandler={beginTrainingHandler}>Begin</Button>}
    </div>
  );
}
