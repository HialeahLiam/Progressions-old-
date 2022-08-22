import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Pause from '@mui/icons-material/Pause';
import styles from './ProgressionView.module.css';
import IconWithLabel from '../IconWithLabel/IconWithLabel';
import ChordsDisplay from '../ChordsDisplay/ChordsDisplay';
import ProgressionToolbar from '../ProgressionToolbar/ProgressionToolbar';
import Soundwave from '../Soundwave/Old_Soundwave';
import Button from '../Button/Button';

function ProgressionView({
  progression, libraryScope, startPlaybackFromAndTo, pauseAudio,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useRef(null);
  const playbackTimer = useRef(null);

  function pause() {
    player.current.pauseVideo();
  }

  function handlePlay(start, end) {
    console.log('playing');
    setIsPlaying(true);
    clearTimeout(playbackTimer.current);
    playbackTimer.current = setTimeout(() => {
      setIsPlaying(false);
    }, (end - start) * 1000);
    startPlaybackFromAndTo(start, end);
  }

  function playFromBeginning() {
    handlePlay(progression.audio.start_time, progression.audio.end_time);
  }

  function handlePause() {
    pauseAudio();
    setIsPlaying(false);
  }

  function handleChordSelect(chordIndex) {
    const times = progression.audio.chord_start_times;
    const start = times[chordIndex];
    const end = chordIndex === times.length - 1
      ? progression.audio.end_time
      : times[chordIndex + 1];
    handlePlay(start, end);
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainSection}>
        <div className={styles.titleAndStats}>
          <span className={styles.title}>{progression.title}</span>
          <div>
            <span className={styles.subtitle}>published by </span>
            {' '}
            <span className={styles.label}>{progression?.user}</span>
          </div>
          <div className={styles.votes}>
            <IconWithLabel icon="thumbs-down" labelText={progression?.downvotes} />
            <IconWithLabel icon="thumbs-up" labelText={progression?.upvotes} />
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.musicInfo}>
            <div className={styles.musicInfoRow}>
              {/* <div className={styles.trackInfo}>
                <span className={styles.label}>
                  {progression.song}
                  {' '}
                </span>
                <span className={`${styles.subtitle} ${styles.by}`}>by </span>
                <span className={styles.label}>
                  {' '}
                  {progression.artist}
                </span>
              </div> */}
            </div>
            <div className={styles.musicInfoRow}>
              <span className={styles.musicLeft}>Root:</span>
              <span className={styles.musicRight}>{progression.root}</span>
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
          <ProgressionToolbar libraryScope={libraryScope} />
        </div>

      </div>
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
      // videoId: PropTypes.string.isRequired,
    }),
    chords: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  libraryScope: PropTypes.oneOf(['public', 'personal']).isRequired,
};
export default ProgressionView;
