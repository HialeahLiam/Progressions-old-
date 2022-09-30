import React, {
  useCallback, useMemo, useRef, useState,
  useEffect,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Breadcrumbs, Button, ButtonGroup, Container, Divider, IconButton, Modal, Stack, TextField, Tooltip, Typography,
} from '@mui/material';
import ReactPlayer from 'react-player/youtube';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import ProgressionView from '../ProgressionView/ProgressionView';
import styles from './ProgressionsWindow.module.css';
import EditProgressionView from '../EditProgressionView/EditProgressionView';
import TitleInput from '../shared/TitleInput/TitleInput';
import { AuthContext } from '../../contexts/AuthContext';
import baseUrl from '../../utils/backend';

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

function ProgressionsWindow({
  progressions, libraryScope, selectedCollections, onEntryCreation, onProgressionEdit, onProgressionDelete, onCollectionDelete,
}) {
  const playbackTimer = useRef(null);
  // tells player when to play
  const [isPlaying, setPlaying] = useState(false);
  // keeps track of which progression is causing player to play
  const [progPlaying, setProgPlaying] = useState(null);
  const [addingProgression, setAddProgression] = useState(false);
  const [addingCollection, setAddCollection] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [urlInput, setUrlInput] = useState('');
  const [audioDuration, setAudioDuration] = useState(null);
  const [editProgression, setEditProgression] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [collectionDeleteAssure, setCollectionDeleteAssure] = useState(false);

  const Authorization = useMemo(() => `bearer ${currentUser?.token}`, [currentUser]);

  const player = useRef(null);

  const lastCollection = useMemo(() => selectedCollections.at(-1), [selectedCollections]);

  function progressionsHaveSameAudioUrl(progs) {
    const firstUrl = progs[0].audio.url;
    const filter = progs.filter(({ audio }) => audio.url === firstUrl);
    return progs.length === filter.length;
  }

  function handleProgressionCreation(progression) {
    // TODO POST request for progression creation and pass response body to onEntryCreation
    const newProgression = { ...progression };
    newProgression.audio.url = audioUrl;
    newProgression.parent_collection_id = lastCollection._id;
    console.log('newProgression');
    console.log(newProgression);
    onEntryCreation(newProgression);
    // ----------------
    setAddProgression(false);
  }

  function handleProgressionEdit(progression) {
    console.log(progression);
    const copy = { ...progression };
    copy.audio.url = audioUrl;
    onProgressionEdit(copy);
    setEditProgression(null);
  }

  function handleCollectionCreation(title) {
    const parent_collection_id = lastCollection._id;
    onEntryCreation({ title, parent_collection_id });
    setAddCollection(false);
  }

  function handleAddProgression() {
    setAddCollection(false);
    setAddProgression(true);
  }

  function handleAddCollection() {
    setAddProgression(false);
    setAddCollection(true);
  }

  function handleEditCancel() {
    setEditProgression(null);
  }

  function handleAddCancel() {
    setAddProgression(false);
    setAddCollection(false);
  }

  function handleUrlInput(event) {
    if (event.type === 'keypress' && event.key !== 'Enter') return;
    setAudioUrl(urlInput);
  }

  function handleTitleEdit(progressionId, newTitle) {
    alert(`${progressionId} changed to ${newTitle}`);
  }

  async function handleCollectionPublish() {
    try {
      await fetch(`${baseUrl}/api/v1/collections/public?id=${lastCollection._id}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization,
        },
      });

      // collection published successfully
      console.log('collection published successfully');
    } catch (error) {
      // collection failed to publish
    }
  }

  function handlePlaybackFromAndTo(progressionId, start, end) {
    console.log('ahndle playback', progressionId, start, end);
    setProgPlaying(progressionId);
    clearTimeout(playbackTimer.current);

    player.current.seekTo(start);
    setPlaying(true);

    playbackTimer.current = setTimeout(() => {
      setPlaying(false);
      setProgPlaying(null);
    }, (end - start) * 1000);
  }

  function handleProgressionDelete(progId) {
    onProgressionDelete(progId);
  }

  function handleCollectionDelete() {
    onCollectionDelete(lastCollection._id);
    setCollectionDeleteAssure(false);
  }

  function promptUserCollectionDelete() {
    setCollectionDeleteAssure(true);
  }

  useEffect(() => {
    const url = (progressions.length > 0 && progressionsHaveSameAudioUrl(progressions)) ? progressions[0].audio.url : null;
    setAudioUrl(url);
  }, [progressions]);

  useEffect(() => {
    setAddCollection(false);
    setAddProgression(false);
  }, [libraryScope]);

  return (
    <div className={styles.container}>

      <Box sx={{
        py: 5,
        display: 'flex',
        justifyContent: 'center',
      }}
      >
        <Breadcrumbs>
          {selectedCollections.map((c) => <Typography key={c._id} color="black" variant="overline">{c.title}</Typography>)}
        </Breadcrumbs>
        {libraryScope === 'personal' && lastCollection && (
        <div>
          <Tooltip title="Publish">
            <IconButton onClick={handleCollectionPublish}>
              <CloudUploadOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Rename">
            <IconButton>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete collection">
            <IconButton color="error" onClick={promptUserCollectionDelete}>
              <ClearIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
        )}
      </Box>

      {audioUrl && (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ReactPlayer
          url={audioUrl}
          onDuration={(d) => setAudioDuration(d)}
          width={300}
          height="auto"
          ref={player}
          playing={isPlaying}
        />
      </div>
      )}
      {progressions.map((p) => (
        <Container
          key={p._id}
        >

          {editProgression === p._id ? (
            <EditProgressionView
              title={p.title}
              root={p.root}
              mode={p.mode}
              progression={p.chords}
              startTimes={p.audio.chord_start_times}
              onProgressionSubmit={(prog) => {
                const progression = { ...prog, _id: p._id };
                handleProgressionEdit(progression);
              }}
              endTime={p.audio.end_time}
              onCancel={handleEditCancel}
              startPlaybackFromAndTo={(start, end) => handlePlaybackFromAndTo(p._id, start, end)}
              audioDuration={audioDuration}
            />
          )

            : (
              <ProgressionView
                libraryScope={libraryScope}
                progression={p}
                startPlaybackFromAndTo={(start, end) => handlePlaybackFromAndTo(p._id, start, end)}
                onTitleChange={(title) => handleTitleEdit(p._id, title)}
                isPlaying={progPlaying === p._id}
                onEdit={() => setEditProgression(p._id)}
                onDelete={() => handleProgressionDelete(p._id)}
              />
            )}
          <Divider sx={{ width: 0.5, mx: 'auto' }} />
        </Container>
      ))}
      <Stack>
        {addingProgression && !audioUrl
        && (
        <TextField
          sx={{ width: '50%', mx: 'auto' }}
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
          onProgressionSubmit={handleProgressionCreation}
          audioDuration={audioDuration}
          onCancel={handleAddCancel}
          startPlaybackFromAndTo={(start, end) => handlePlaybackFromAndTo(null, start, end)}
        />
        )}
        {libraryScope === 'personal' && lastCollection?.entry_type !== 'collection' && selectedCollections.length > 0
        && !addingProgression && (
          <Button
            onClick={handleAddProgression}
          >
            Add Progression
          </Button>
        )}
        {addingCollection && <TitleInput onSubmit={handleCollectionCreation} />}
        {libraryScope === 'personal' && lastCollection?.entry_type !== 'progression' && selectedCollections.length > 0
        && !addingCollection && <Button onClick={handleAddCollection}>Add Collection</Button>}
      </Stack>
      <Modal
        open={collectionDeleteAssure}
        onClose={() => setCollectionDeleteAssure(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 5 }}>
            Are you sure you want to delete
            {' '}
            {lastCollection?.title}
            ?
          </Typography>
          <ButtonGroup>
            <Button onClick={() => setCollectionDeleteAssure(false)}>Cancel</Button>
            <Button onClick={handleCollectionDelete} color="error">Delete</Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </div>
  );
}

ProgressionsWindow.defaultProps = defaultProps;

ProgressionsWindow.propTypes = propTypes;

export default ProgressionsWindow;
