import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const ChatWindow = ({ messages }) => {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index} sx={{ display: 'flex', justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <Box sx={{ backgroundColor: message.sender === 'user' ? '#DCF8C6' : '#FFFFFF', padding: 2, borderRadius: 2, maxWidth: '80%' }}>
              <Typography variant="body2">{message.content}</Typography>
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'right' }}>
                {new Date(message.timestamp).toLocaleTimeString()}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatWindow;
