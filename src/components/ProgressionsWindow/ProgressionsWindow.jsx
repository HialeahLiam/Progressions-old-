import React, {
  useCallback, useMemo, useRef, useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Breadcrumbs, Button, Container, Stack, TextField, Typography,
} from '@mui/material';
import ReactPlayer from 'react-player/youtube';
import ProgressionView from '../ProgressionView/ProgressionView';
import styles from './ProgressionsWindow.module.css';
import EditProgressionView from '../EditProgressionView/EditProgressionView';

const propTypes = {
  libraryScope: PropTypes.oneOf(['public', 'personal']).isRequired,
  selectedCollections: PropTypes.arrayOf(PropTypes.shape({
    entries: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
    })),
    _id: PropTypes.string,
  })),
};

const defaultProps = {
  selectedCollections: [],
};

function ProgressionsWindow({ libraryScope, selectedCollections, onEntryCreation }) {
  const playbackTimer = useRef(null);
  const [playing, setPlaying] = useState(false);
  const player = useRef(null);
  const [addingProgression, setAddProgression] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [urlInput, setUrlInput] = useState('');
  const [audioDuration, setAudioDuration] = useState(null);
  console.log(selectedCollections);

  const lastCollection = useMemo(() => selectedCollections.at(-1), [selectedCollections]);

  const progressions = useMemo(() => (lastCollection?.entry_type === 'progression'
    ? lastCollection.entries
    : []), [selectedCollections]);

  function progressionsHaveSameAudioUrl(progs) {
    const firstUrl = progs[0].audio.url;
    const filter = progs.filter(({ audio }) => audio.url === firstUrl);
    return progs.length === filter.length;
  }

  useEffect(() => {
    const url = (progressions.length > 0 && progressionsHaveSameAudioUrl(progressions)) ? progressions[0].audio.url : null;
    setAudioUrl(url);
  }, [progressions]);

  function startPlaybackFromAndTo(start, end) {
    clearTimeout(playbackTimer.current);

    player.current.seekTo(start);
    setPlaying(true);

    playbackTimer.current = setTimeout(() => {
      setPlaying(false);
    }, (end - start) * 1000);
  }

  function handleAddProgression() {
    setAddProgression(true);
  }

  function handleUrlInput(event) {
    if (event.type === 'keypress' && event.key !== 'Enter') return;
    setAudioUrl(urlInput);
  }

  function handleProgressionCreation(progression) {
    // TODO POST request for progression creation and pass response body to onEntryCreation
    const newProgression = { ...progression };
    newProgression.audio.url = audioUrl;
    onEntryCreation(progression);
    // ----------------
    setAddProgression(false);
  }

  return (
    <div className={styles.container}>

      <Box sx={{
        // bgcolor: '#bfbfbf',
        // pl: 5,
        py: 5,
        display: 'flex',
      }}
      >
        <Breadcrumbs
          sx={{ mx: 'auto' }}
        >
          {selectedCollections.map((c) => <Typography key={c._id} color="black" variant="overline">{c.title}</Typography>)}
        </Breadcrumbs>
      </Box>
      {/* <YouTubePlayer
          sendPlayerObject={handleYouTubePlayer}
          videoId={progression.youtube_data.videoId}
          className={styles.youtube}
        /> */}
      {audioUrl && (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ReactPlayer
          url={audioUrl}
          onDuration={(d) => setAudioDuration(d)}
          width={300}
          height="auto"
          ref={player}
          playing={playing}
        />
      </div>
      )}
      {progressions.map((p) => (
        <ProgressionView
          libraryScope={libraryScope}
          progression={p}
          key={p._id}
          startPlaybackFromAndTo={startPlaybackFromAndTo}
          pauseAudio={() => setPlaying(false)}
        />
      ))}
      <Stack>
        {addingProgression && !audioUrl
        && (
        <TextField
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyPress={(e) => handleUrlInput(e)}
          variant="standard"
          placeholder="enter YouTube URL for audio"
        />
        )}
        {addingProgression && audioUrl && (
        <EditProgressionView
          endTime={audioDuration}
          onProgressionAdd={handleProgressionCreation}
          audioDuration={audioDuration}
        />
        )}
        {libraryScope === 'personal' && lastCollection?.entry_type !== 'collection' && selectedCollections.length > 0
        && (
        <Button
          onClick={handleAddProgression}
        >
          Add Progression
        </Button>
        )}
        {libraryScope === 'personal' && lastCollection?.entry_type !== 'progression' && selectedCollections.length > 0
        && <Button>Add Collection</Button>}
      </Stack>
    </div>
  );
}

ProgressionsWindow.defaultProps = defaultProps;

ProgressionsWindow.propTypes = propTypes;

export default ProgressionsWindow;