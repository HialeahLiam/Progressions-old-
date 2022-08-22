import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import ChordsDisplay from './ChordsDisplay/ChordsDisplay';
import RootInput from './RootInput/RootInput';
import IntervalSelect from './IntervalSelect';
import { Scale } from '../lib/progressions';

const propTypes = {
  progression: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

const defaultProps = {
  progression: [[]],
};

function ProgressionInput({ progression }) {
  const [selectedChordIdx, setSelectedChordIdx] = useState(0);
  const [chords, setChords] = useState(progression);

  const selectedChord = chords[selectedChordIdx];
  console.log(selectedChordIdx);

  function handleChordDelete(chordIdx) {
    if (chords.length !== 1) {
      if (selectedChordIdx !== 0) setSelectedChordIdx((prev) => prev - 1);
      setChords((prev) => prev.filter((chord, i) => i !== chordIdx));
    }
  }

  function handleChordAdd() {
    setChords((prev) => [...prev, []]);
    setSelectedChordIdx(chords.length);
  }

  function replaceSelectedChord(chord) {
    setChords((prev) => {
      const copy = [...prev];
      copy[selectedChordIdx] = chord;
      return copy;
    });
  }

  useEffect(() => {
    setChords(progression);
  }, [progression]);

  return (
    <>
      <ChordsDisplay
        progression={chords}
        selected={selectedChordIdx}
        handleChordSelect={(chordIdx) => setSelectedChordIdx(chordIdx)}
        handleChordDelete={handleChordDelete}
        handleChordAdd={handleChordAdd}
      />
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
      }}
      >
        <RootInput scale={Scale.MAJOR} handleRootSelect={replaceSelectedChord} />
        <IntervalSelect chord={selectedChord} handleChordModification={replaceSelectedChord} />
      </Box>
    </>
  );
}

ProgressionInput.propTypes = propTypes;
ProgressionInput.defaultProps = defaultProps;

export default ProgressionInput;
