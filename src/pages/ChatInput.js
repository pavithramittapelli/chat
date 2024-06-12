import React, { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PhotoIcon from '@mui/icons-material/Photo';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage('text', message);
      setMessage('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onSendMessage('image', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', padding: 2, borderTop: '1px solid #e6e6e6' }}>
      <TextField
        fullWidth
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton color="primary" component="label">
                <AttachFileIcon />
                <input type="file" hidden onChange={handleFileUpload} />
              </IconButton>
              <IconButton color="primary" component="label">
                <PhotoIcon />
                <input type="file" hidden onChange={handleFileUpload} />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" type="submit">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default ChatInput;
