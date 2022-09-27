import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ClearIcon from '@mui/icons-material/Clear';

function ProgressionToolbar({
  libraryScope, onEdit, onPublish, onDelete,
}) {
  return (
    <ButtonGroup>
      {libraryScope === 'public' && (
      <Button
        startIcon={<ThumbUpAltOutlinedIcon />}
        size="small"
        variant="contained"
      >
        Upvote
      </Button>
      )}
      {libraryScope === 'public' && (
      <Button
        startIcon={<ThumbDownAltOutlinedIcon />}
        size="small"
        variant="contained"
      >
        Downvote
      </Button>
      )}
      {/* {libraryScope === 'personal' && (
      <Button
        startIcon={<CloudUploadOutlinedIcon />}
        size="small"
        variant="contained"
      >
        Publish
      </Button>
      )} */}
      {libraryScope === 'personal' && (
      <Button
        startIcon={<EditOutlinedIcon />}
        size="small"
        variant="contained"
        onClick={onEdit}
      >
        Edit
      </Button>

      )}
      {libraryScope === 'personal' && (
      <Button
        startIcon={<ClearIcon fontSize="small" />}
        size="small"
        variant="contained"
        onClick={onDelete}
        color="error"
      >
        Delete
      </Button>

      )}

    </ButtonGroup>
  );
}

ProgressionToolbar.propTypes = {
  libraryScope: PropTypes.oneOf(['public', 'personal']).isRequired,
};

export default ProgressionToolbar;
