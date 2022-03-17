import React, { useState } from 'react';
import '../styles/Synthesizer.css';

function Synthesizer() {
  const [volume, setVolume] = useState(0.5);

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const noteFreq = [];
  for (let octave = 0; octave < 9; octave++) {
    noteFreq[octave] = [];
    // 0 is C
    // TODO calculate kFactor
    const kFactor = 2 ** (1 / 12);
    for (let note = 0; note < 12; note++) {
      noteFreq[octave][note] = 27.5;
      if (!(octave === 0 && note < 9)) {
        const prevNote = note === 0
          ? noteFreq[octave - 1][11]
          : noteFreq[octave][note - 1];
        noteFreq[octave][note] = prevNote * kFactor;
      }
    }
  }

  return (
    <>
      <div className="container">
        <div className="keyboard" />
      </div>
      <div className="settings-bar">
        <div
          className="left"
        >
          <span>Volume: </span>
          <input
            type="range"
            min="0.0"
            max="1.0"
            value={volume}
            onChange={handleVolumeChange}
            step="0.01"
            list="volumes"
            name="volume"
          />
          <datalist id="volumes">
            <option value="0.0" label="Mute" />
            <option value="1.0" label="100%" />
          </datalist>
        </div>
        <div className="right">
          <span>Current waveform: </span>
          <select name="waveform">
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="triangle">Triangle</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Synthesizer;
