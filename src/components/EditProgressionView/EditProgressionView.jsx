import {
  Alert,
  Box, Button, Container, MenuItem, TextField, Typography,
} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ChordsDisplay from '../ChordsDisplay/ChordsDisplay';
import Soundwave from '../Soundwave/Soundwave';
import styles from './EditProgressionView.module.css';
import RootInput from '../RootInput/RootInput';
import IntervalSelect from '../IntervalSelect';
import { Scale } from '../../lib/progressions';

const rootValues = [
  {
    value: 0,
    label: 'C',
  },
  {
    value: 1,
    label: 'C#',
  },
  {
    value: 2,
    label: 'D',
  },
  {
    value: 3,
    label: 'D#',
  },
  {
    value: 4,
    label: 'E',
  },
  {
    value: 5,
    label: 'F',
  },
  {
    value: 6,
    label: 'F#',
  },
  {
    value: 7,
    label: 'G',
  },
  {
    value: 8,
    label: 'G#',
  },
  {
    value: 9,
    label: 'A',
  },
  {
    value: 10,
    label: 'A#',
  },
  {
    value: 11,
    label: 'B',
  },
];

const mockProgression = [
  [0, 4, 7],
  [2, 5, 9],
  [4, 7, 11],
];

const propTypes = {
  title: PropTypes.string,
  root: PropTypes.number,
  mode: PropTypes.oneOf([Scale.MAJOR, Scale.MINOR]),
  progression: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  startTimes: PropTypes.arrayOf(PropTypes.number),
  endTime: PropTypes.number.isRequired,
  onProgressionAdd: PropTypes.func,
};

const defaultProps = {
  title: '',
  root: 0,
  mode: Scale.MAJOR,
  progression: [[]],
  startTimes: [0],
  onProgressionAdd: null,
};

function EditProgressionView({
  title, root, mode, progression, endTime, startTimes, onProgressionAdd, audioDuration,
}) {
  const [titleVal, setTitle] = useState(title);
  const [rootVal, setRoot] = useState(root);
  const [modeVal, setMode] = useState(mode);
  const [chordStartTimes, setStartTimes] = useState(startTimes);
  const [chords, setChords] = useState(progression);
  const [invalidInput, setInvalidInput] = useState(false);
  const [audioEnd, setAudioEnd] = useState(endTime);
  // const [audioRange, setAudioRange] = useState([]);

  const [selectedChordIdx, setSelectedChordIdx] = useState(0);

  const selectedChord = chords[selectedChordIdx];

  function handleChordDelete(chordIdx) {
    if (chords.length > 1) {
      if (selectedChordIdx !== 0) {
        setSelectedChordIdx((prev) => prev - 1);
      }
      if (chordIdx > 0) setStartTimes((prev) => prev.filter((t, i) => i !== chordIdx));
      else if (chordIdx === 0) setStartTimes((prev) => prev.filter((t, i) => i !== 1));
      setChords((prev) => prev.filter((chord, i) => i !== chordIdx));
    }
  }

  function handleChordAdd() {
    setChords((prev) => [...prev, []]);
    setSelectedChordIdx(chords.length);
    setStartTimes((prev) => [...prev, prev.at(-1) + 5]);
  }

  function replaceSelectedChord(chord) {
    setChords((prev) => {
      const copy = [...prev];
      copy[selectedChordIdx] = chord;
      return copy;
    });
  }

  function handleRangeChange(range) {
    console.log(range);
    setStartTimes((prev) => [range[0], ...prev.slice(1)]);
    setAudioEnd(range[1]);
  }

  function handleSubmit() {
    // TODO check that all required information is complete.
    if (titleVal.length === 0 || chords.length === 0) {
      setInvalidInput(true);
    } else {
      onProgressionAdd({
        title: titleVal,
        root: rootVal,
        mode: modeVal,
        chords,
        audio: {
          chord_start_times: chordStartTimes,
          end_time: audioEnd,
        },
      });
    }
  }

  useEffect(() => setTitle(title), [title]);
  useEffect(() => setRoot(root), [root]);
  useEffect(() => setMode(mode), [mode]);
  useEffect(() => setStartTimes(startTimes), [startTimes]);
  useEffect(() => setChords(progression), [progression]);
  useEffect(() => setAudioEnd(endTime), [endTime]);
  // useEffect(() => { setAudioRange([startTimes[0], endTime]); }, [startTimes, endTime]);

  return (
    <Container>
      <Soundwave
        endTime={audioEnd}
        chordStartTimes={chordStartTimes}
        updateChordTimes={(startTimes) => setStartTimes(startTimes)}
        updateAudioRange={handleRangeChange}
        audioDuration={audioDuration}
      />
      <Box
        // bgcolor="red"
        sx={{
          display: 'flex',
        }}
      >
        <TextField
          sx={{ flex: 1 }}
          variant="standard"
          value={titleVal}
          placeholder="title"
          multiline
          onChange={(e) => setTitle(e.target.value)}
          // eslint-disable-next-line react/jsx-props-no-spreading, no-undef
          {...(invalidInput && titleVal.length === 0 && { error: true, helperText: 'Include a title' })}
        />
        <Container
          sx={{
            flex: 2,
          }}
        >

          <div className={styles.musicInfoRow}>
            <span className={styles.musicLeft}>Root:</span>
            <TextField
              value={rootVal}
              onChange={(e) => setRoot(e.target.value)}
              select
              variant="standard"
            >
              {rootValues.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className={styles.musicInfoRow}>
            <span className={styles.musicLeft}>Mode:</span>
            <TextField
              value={modeVal}
              onChange={(e) => setMode(e.target.value)}
              select
              variant="standard"
            >
              <MenuItem value="major">major</MenuItem>
              <MenuItem value="minor">minor</MenuItem>
            </TextField>
          </div>
        </Container>
      </Box>

      <ChordsDisplay
        edit
        progression={chords}
        selected={selectedChordIdx}
        handleChordSelect={(chordIdx) => setSelectedChordIdx(chordIdx)}
        handleChordDelete={handleChordDelete}
        handleChordAdd={handleChordAdd}
      />
      {/* <Typography variant> Progression must contain at least one chord.</Typography> */}
      {invalidInput && chords.filter((c) => c.length > 0).length === 0 && <Alert severity="error">Progression cannot contain empty chords.</Alert>}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
      }}
      >
        <RootInput scale={Scale.MAJOR} handleRootSelect={replaceSelectedChord} />
        <IntervalSelect chord={selectedChord} handleChordModification={replaceSelectedChord} />
      </Box>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>

  );
}

EditProgressionView.propTypes = propTypes;
EditProgressionView.defaultProps = defaultProps;

export default EditProgressionView;
