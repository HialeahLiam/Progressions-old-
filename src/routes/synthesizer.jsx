/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../styles/Synthesizer.css';

function Synthesizer() {
  const [volume, setVolume] = useState(0.5);

  const audioContext = new window.AudioContext();
  const oscList = [];
  const mainGainNode = null;
  const sineTerms = null;
  const cosineTerms = null;

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const noteFreq = [];
  for (let octave = 0; octave < 9; octave++) {
    noteFreq[octave] = [];
    // 0 is C
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
  console.log(noteFreq);
  return (
    <>
      <div className="keyboard-container">
        <div className="keyboard">
          {noteFreq.map((oct, i) => {
            const notes = Object.entries(oct);
            return (
              <div className="octave">
                {notes.map((note, j) => (
                  <div className="key" data-octave={i} data-note={j} data-frequency={j}>
                    <div />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <div className="settingsBar">
        <div
          className="settingsBar-left"
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
        <div className="settingsBar-right">
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
