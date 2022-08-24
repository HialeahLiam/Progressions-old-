import { Box, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import Add from '@mui/icons-material/Add';

function TitleInput({ onSubmit }) {
  const [title, setTitle] = useState('');

  const handleInputSubmit = () => {
    onSubmit(title);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleInputSubmit();
    }
  };

  return (

    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
    }}
    >
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="standard"
        placeholder="title"
        onKeyPress={handleInputKeyPress}
        autoFocus
      />
      <IconButton
        onClick={handleInputSubmit}
        aria-label="add collection"
      >
        <Add />
      </IconButton>
    </Box>

  );
}

export default TitleInput;
