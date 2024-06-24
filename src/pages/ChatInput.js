import React, { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';


const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const messageType = file.type.startsWith('image') ? 'image' : 'file';
        onSendMessage(messageType, e.target.result, file.name);
        setFile(null);
        setMessage('');
      };
      reader.readAsDataURL(file);
    } else if (message.trim()) {
      onSendMessage('text', message);
      setMessage('');
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage(selectedFile.name);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', padding: 2, borderTop: '1px solid #e6e6e6', position: 'relative' }}>
      <TextField
        fullWidth
        variant="outlined"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          if (file) setFile(null);
        }}
        placeholder="Type a message..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton color="primary" component="label">
                <AttachFileIcon />
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
