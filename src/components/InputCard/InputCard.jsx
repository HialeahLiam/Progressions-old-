import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import Add from '@mui/icons-material/Add';

function InputCard({ onSubmit }) {
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

    <div>
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
    </div>

  );
}

export default InputCard;
