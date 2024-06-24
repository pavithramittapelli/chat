import React, { useState, useEffect, useMemo } from 'react';
import {
  Box, Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Checkbox, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction,
  IconButton, AppBar, Toolbar, Typography, Switch, InputAdornment
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ContactList from './ContactList';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { initialContacts } from './index';
import SearchIcon from '@mui/icons-material/Search';
import { Add, Remove, ExpandMore } from '@mui/icons-material';

const ChatApp = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [messages, setMessages] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);
  const [editGroupOpen, setEditGroupOpen] = useState(false);
  const [editedGroupName, setEditedGroupName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [editingIcon, setEditingIcon] = useState(false);
  const [groupDetails, setGroupDetails] = useState(null);
  const [error, setError] = useState('');
  const [unreadCounts, setUnreadCounts] = useState(
    initialContacts.reduce((acc, contact) => {
      acc[contact.id] = contact.unreadMessages || 0;
      return acc;
    }, {})
  );

  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  }), [darkMode]);

  const handleSaveName = () => {
    handleEditGroupName(editedGroupName);
    setEditingName(false);
  };

  const handleSaveIcon = () => {
    // Implement the logic to edit the group icon
    setEditingIcon(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const messagesData = initialContacts;
      setMessages(messagesData);

      const counts = {};
      Object.keys(messagesData).forEach((contactId) => {
        counts[contactId] = messagesData[contactId].filter((msg) => !msg.read).length;
      });
      setUnreadCounts(counts);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSelectContact = (contactId) => {
    setSelectedContactId(contactId);
    markMessagesAsRead(contactId);
  };

  const markMessagesAsRead = (contactId) => {
    setMessages((prevMessages) => {
      const updatedMessages = { ...prevMessages };
      updatedMessages[contactId] = Array.isArray(updatedMessages[contactId])
        ? updatedMessages[contactId].map((msg) =>
          msg.read ? msg : { ...msg, read: true }
        )
        : [];
      return updatedMessages;
    });
    setUnreadCounts((prevCounts) => ({
      ...prevCounts,
      [contactId]: 0,
    }));
  };

  const handleSendMessage = (type, content, fileName = '') => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === selectedContactId
        ? {
          ...contact,
          lastMessage: type === 'text' ? content : fileName,
          lastMessageTimestamp: new Date().toISOString(),
        }
        : contact
    );
    setContacts(updatedContacts);

    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedContactId]: [
        ...(prevMessages[selectedContactId] || []),
        { type, content, fileName, sender: 'user', timestamp: new Date().toISOString(), read: true },
      ],
    }));
    setUnreadCounts((prevCounts) => ({
      ...prevCounts,
      [selectedContactId]: (prevCounts[selectedContactId] || 0) + 1,
    }));
  };

  const filteredContacts = contacts
    .filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const unreadA = unreadCounts[a.id];
      const unreadB = unreadCounts[b.id];

      if (unreadA && !unreadB) return -1;
      if (!unreadA && unreadB) return 1;
      if (unreadA && unreadB) return unreadB - unreadA;

      const lastMessageA = a.lastMessageTimestamp ? new Date(a.lastMessageTimestamp) : new Date(a.createdAt);
      const lastMessageB = b.lastMessageTimestamp ? new Date(b.lastMessageTimestamp) : new Date(b.createdAt);
      return lastMessageB - lastMessageA;
    });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateGroup = () => {
    if (groupName.length === 0) {
      setError('Group Name is Mandatory');
    } else {
      const newGroup = {
        id: contacts.length + 1,
        name: groupName,
        avatar: 'https://via.placeholder.com/40',
        lastMessage: '',
        type: 'group',
        members: groupMembers,
        createdAt: new Date(),
        unreadMessages: 0,
      };
      setContacts([...contacts, newGroup]);
      setGroupName('');
      setGroupMembers([]);
      handleClose();
    }
  };

  const handleToggleMember = (memberId) => {
    const currentIndex = groupMembers.indexOf(memberId);
    const newChecked = [...groupMembers];

    if (currentIndex === -1) {
      newChecked.push(memberId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setGroupMembers(newChecked);
  };

  const handleEditGroupOpen = () => {
    const selectedGroup = contacts.find((contact) => contact.id === selectedContactId);
    setGroupDetails(selectedGroup);
    setEditedGroupName(selectedGroup.name);
    setEditGroupOpen(true);
  };

  const handleEditGroupClose = () => {
    setEditGroupOpen(false);
  };

  const handleEditGroupName = (newName) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === selectedContactId
        ? { ...contact, name: newName }
        : contact
    );
    setContacts(updatedContacts);
    handleEditGroupClose();
  };
  const handleAddMember = () => { }
  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ height: '100vh' }}>
        <Grid item xs={12} md={3} sx={{ height: '100%', backgroundColor: 'background.paper', borderRight: '1px solid #e6e6e6', display: 'flex', flexDirection: 'column' }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                ChatApp
              </Typography>
              <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </Toolbar>
          </AppBar>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search or start new chat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ marginTop: '0.5rem' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ height: '100%', overflowY: 'auto' }}>
            <ContactList contacts={filteredContacts} onSelectContact={handleSelectContact} unreadCounts={unreadCounts} />
          </Box>
          <Box sx={{ padding: 2 }}>
            <Button variant="contained" color="primary" fullWidth onClick={handleOpen}>
              New Group
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={9} sx={{ display: 'flex', backgroundColor: 'background.paper', flexDirection: 'column', overflowY: 'auto', height: '100%' }}>
          {selectedContactId ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: 2, borderBottom: '1px solid #e6e6e6', backgroundColor: '#d3d3d3' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <h2>{contacts.find((contact) => contact.id === selectedContactId).name}</h2>
                </Box>
                {contacts.find((contact) => contact.id === selectedContactId).type === 'group' && (
                  <IconButton color="primary" onClick={handleEditGroupOpen}>
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton>
                  <ExpandMore />
                </IconButton>
              </Box>
              <Box sx={{ flex: 1, overflowY: 'auto', height: '100%' }}>
                <ChatWindow messages={messages[selectedContactId] || []} />
              </Box>
              <Box sx={{ borderTop: '1px solid #e6e6e6' }}>
                <ChatInput onSendMessage={handleSendMessage} />
              </Box>
            </>
          ) : (
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p>Select a contact to start chatting</p>
            </Box>
          )}
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create a New Group</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the name of the group and select members.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Group Name"
              type="text"
              fullWidth
              value={groupName}
              error={!!error}
              helperText={error}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <List>
              {contacts.filter(contact => contact.type === 'user').map((contact) => (
                <ListItem key={contact.id} button onClick={() => handleToggleMember(contact.id)}>
                  <ListItemAvatar>
                    <Avatar alt={contact.name} src={contact.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={contact.name} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      checked={groupMembers.indexOf(contact.id) !== -1}
                      onChange={() => handleToggleMember(contact.id)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreateGroup} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={editGroupOpen} onClose={handleEditGroupClose}>
          <DialogTitle>Group Details</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <Avatar alt={groupDetails?.name} src={groupDetails?.avatar} sx={{ width: 56, height: 56 }} />
              {editingIcon ? (
                <>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Group name"
                    type="text"
                    fullWidth
                    onChange={(e) => setEditedGroupName(e.target.value)} // Modify to handle icon URL change
                  />
                  <Button onClick={handleSaveIcon} color="primary">Save</Button>
                  <Button onClick={() => setEditingIcon(false)} color="primary">Cancel</Button>
                  <Button variant="contained" color="primary" onClick={handleAddMember}>
                    <Add />
                  </Button>
                </>
              ) : (
                <IconButton onClick={() => setEditingIcon(true)}><EditIcon /></IconButton>
              )}
            </Box>
            {editingName ? (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Group Name"
                  type="text"
                  fullWidth
                  value={editedGroupName}
                  onChange={(e) => setEditedGroupName(e.target.value)}
                />
                <Button onClick={handleSaveName} color="primary">Save</Button>
                <Button onClick={() => setEditingName(false)} color="primary">Cancel</Button>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <h2>{groupDetails?.name}</h2>
                <IconButton onClick={() => setEditingName(true)}><EditIcon /></IconButton>
              </Box>
            )}
            <List>
              {groupDetails?.members.map((memberId) => {
                const member = contacts.find(contact => contact.id === memberId);
                return (
                  <ListItem key={memberId}>
                    <ListItemAvatar>
                      <Avatar alt={member?.name} src={member?.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={member?.name} />
                  </ListItem>
                );
              })}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditGroupClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </ThemeProvider>
  );
};

export default ChatApp;
