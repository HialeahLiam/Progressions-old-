import React, {
  useCallback, useState, useRef, useEffect, useMemo, useContext,
} from 'react';
import PropTypes from 'prop-types';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Pause from '@mui/icons-material/Pause';
import {
  Box, Button, ButtonGroup, Grid, Modal, TextField, Typography,
} from '@mui/material';
import styles from './ProgressionView.module.css';
import IconWithLabel from '../IconWithLabel/IconWithLabel';
import ChordsDisplay from '../ChordsDisplay/ChordsDisplay';
import ProgressionToolbar from '../ProgressionToolbar/ProgressionToolbar';
import Soundwave from '../Soundwave/Old_Soundwave';
import { KEYS } from '../../lib/progressions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ProgressionView({
  progression, libraryScope, startPlaybackFromAndTo, onTitleChange, isPlaying, onEdit, onDelete,
}) {
  const [title, setTitle] = useState(progression.title);
  const [deleteAssure, setDeleteAssure] = useState(false);
  const playbackTimer = useRef(null);

  function handlePlay(start, end) {
    startPlaybackFromAndTo(start, end);
  }

  function playFromBeginning() {
    handlePlay(progression.audio.chord_start_times[0], progression.audio.end_time);
  }

  function handlePause() {
    startPlaybackFromAndTo(0, 0);
  }

  function handleChordSelect(chordIndex) {
    const times = progression.audio.chord_start_times;
    const start = times[chordIndex];
    const end = chordIndex === times.length - 1
      ? progression.audio.end_time
      : times[chordIndex + 1];
    handlePlay(start, end);
  }

  function handleEdit() { onEdit(); }

  function promptDelete() {
    setDeleteAssure(true);
  }

  function handleDelete() {
    onDelete();
    setDeleteAssure(false);
  }

  useEffect(() => {
    setTitle(progression.title);
  }, [progression]);

  return (
    <div className={styles.container}>
      <Grid container className={styles.mainSection}>
        <Grid item lg={4} className={styles.titleAndStats}>

          <span
            className={styles.title}
          >
            {title}
          </span>

          {libraryScope === 'public'
          && (
          <>
            <div>
              <span className={styles.subtitle}>published by </span>
              {' '}
              <span className={styles.label}>{progression?.user}</span>
            </div>
            <div className={styles.votes}>
              <IconWithLabel icon="thumbs-down" labelText={progression?.downvotes} />
              <IconWithLabel icon="thumbs-up" labelText={progression?.upvotes} />
            </div>
          </>
          )}
        </Grid>
        <Grid item lg={4}>
          <Box sx={{ display: 'flex', flexDirection: ' column', alignItems: 'center' }}>
            <div className={styles.musicInfo}>
              <div className={styles.musicInfoRow} />
              <div className={styles.musicInfoRow}>
                <span className={styles.musicLeft}>Root:</span>
                <span className={styles.musicRight}>{KEYS[progression.root]}</span>
              </div>
              <div className={styles.musicInfoRow}>
                <span className={styles.musicLeft}>Mode:</span>
                <span className={styles.musicRight}>{progression.mode}</span>
              </div>
            </div>
            {isPlaying
              ? (
                <button
                  aria-label="pause progression audio"
                  onClick={handlePause}
                >
                  <Pause />
                </button>
              )
              : (
                <button
                  aria-label="play progression audio"
                  onClick={playFromBeginning}
                >
                  <PlayArrow />
                </button>
              )}
            <ChordsDisplay
              handleChordSelect={(c) => handleChordSelect(c)}
              progression={progression.chords}
              isPlaying
            />
            <ProgressionToolbar libraryScope={libraryScope} onEdit={handleEdit} onDelete={promptDelete} />
          </Box>
        </Grid>
        <Grid item lg={4} />

      </Grid>
      <Modal
        open={deleteAssure}
        onClose={() => setDeleteAssure(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 5 }}>
            Are you sure you want to delete this progression?
          </Typography>
          <ButtonGroup>
            <Button onClick={() => setDeleteAssure(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error">Delete</Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </div>
  );
}

ProgressionView.propTypes = {
  progression: PropTypes.shape({
    title: PropTypes.string.isRequired,
    downvotes: PropTypes.number.isRequired,
    upvotes: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    root: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
    song: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    audio: PropTypes.shape({
      start_time: PropTypes.number.isRequired,
      end_time: PropTypes.number,
      chord_start_times: PropTypes.arrayOf(PropTypes.number),
    }),
    chords: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  libraryScope: PropTypes.oneOf(['public', 'personal']).isRequired,
};
export default ProgressionView;
