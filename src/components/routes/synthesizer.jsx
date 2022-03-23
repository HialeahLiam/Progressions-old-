/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { auth } from '../../firebase';
import '../../styles/Synthesizer.css';

const client_id = '30f138fdc6fd4cd3a594f10d256a4e35';
const client_secret = 'e92405addf56451097df4535c474a191';

const Url = 'https://accounts.spotify.com/api/token';
const Data = {
  grant_type: 'client_credentials',
};

const otherParams = {
  headers: {
    Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'grant_type=client_credentials',
  method: 'POST',
};

let token = '';
fetch(Url, otherParams)
  .then((data) => data.json())
  .then((res) => {
    token = res.access_token;
    console.log('Spotify access token:');
    console.log(res);
  })
  .catch((error) => console.log(error));

function Synthesizer() {
  const [volume, setVolume] = useState(0.5);

  const audioContext = new window.AudioContext();
  const oscList = [];
  const mainGainNode = null;
  const sineTerms = null;
  const cosineTerms = null;

  const { currentUser } = useContext(AuthContext);

  const handleClick = () => {
    console.log(token);
    let songID = '';
    let songName = '';
    fetch(
      'https://api.spotify.com/v1/search?q=artist:radiohead+track:karma%20police&type=track',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application.json',
        },
      },
    )
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        songID = res.tracks.items[0].id;
        songName = res.tracks.items[0].name;
        console.log(`${songID} ${songName}`);
      })
      .then(() => {
        fetch(
          `https://api.spotify.com/v1/audio-analysis/${songID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application.json',
            },
          },
        )
          .then((data) => data.json())
          .then((res) => {
            console.log(res);
          });
      })
      .catch((err) => console.log(err));
  };

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
      <button type="button" onClick={handleClick}>Spotify token</button>

      <h2>
        Current user:
        {currentUser && currentUser.email}
      </h2>

      <button type="button" onClick={() => auth.signOut(currentUser)}>Sign out</button>
    </>
  );
}

export default Synthesizer;
