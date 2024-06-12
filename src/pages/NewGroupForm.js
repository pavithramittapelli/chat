import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const NewGroupForm = ({ onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim()) {
      setError('Group name cannot be empty.');
    } else {
      onCreateGroup(groupName);
      setGroupName('');
      setError('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
      <Typography variant="h6">Create New Group</Typography>
      <TextField
        fullWidth
        variant="outlined"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Group Name"
        error={!!error}
        helperText={error}
        sx={{ marginBottom: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Create Group
      </Button>
    </Box>
  );
};

export default NewGroupForm;
