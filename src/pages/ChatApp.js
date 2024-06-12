import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Checkbox, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ContactList from './ContactList';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { initialContacts } from './index';

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

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSelectContact = (contactId) => {
    setSelectedContactId(contactId);
  };

  const handleSendMessage = (type, content) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === selectedContactId
        ? { ...contact, lastMessage: content }
        : contact
    );
    setContacts(updatedContacts);

    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedContactId]: [
        ...(prevMessages[selectedContactId] || []),
        { type, content, sender: 'user', timestamp: new Date() },
      ],
    }));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateGroup = () => {
    const newGroup = {
      id: contacts.length + 1,
      name: groupName,
      avatar: 'https://via.placeholder.com/40',
      lastMessage: '',
      type: 'group',
      members: groupMembers
    };
    setContacts([...contacts, newGroup]);
    setGroupName('');
    setGroupMembers([]);
    handleClose();
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
    setEditedGroupName(contacts.find(contact => contact.id === selectedContactId).name);
    setEditGroupOpen(true);
  };

  const handleEditGroupClose = () => {
    setEditGroupOpen(false);
  };

  const handleEditGroupName = () => {
    const updatedContacts = contacts.map(contact =>
      contact.id === selectedContactId
        ? { ...contact, name: editedGroupName }
        : contact
    );
    setContacts(updatedContacts);
    handleEditGroupClose();
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={12} md={3} sx={{ borderRight: '1px solid #e6e6e6', display: 'flex', flexDirection: 'column' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search or start new chat"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ margin: 2 }}
        />
        <Box sx={{ height: '100%', overflowY: 'auto', flexGrow: 1 }}>
          <ContactList contacts={filteredContacts} onSelectContact={handleSelectContact} />
        </Box>
        <Box sx={{ padding: 2 }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleOpen}>
            New Group
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column' }}>
        {selectedContactId ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, borderBottom: '1px solid #e6e6e6' }}>
              <Box sx={{ flexGrow: 1 }}>
                <h2>{contacts.find(contact => contact.id === selectedContactId).name}</h2>
              </Box>
              {contacts.find(contact => contact.id === selectedContactId).type === 'group' && (
                <IconButton color="primary" onClick={handleEditGroupOpen}>
                  <EditIcon />
                </IconButton>
              )}
            </Box>
            <Box sx={{ flex: 1, overflow: 'scroll', height: '100%' }}>
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
            onChange={(e) => setGroupName(e.target.value)}
          />
          <List spacing>
            {contacts.filter(contact => contact.type === 'user').map((contact) => (
              <ListItem key={contact.id} button onClick={() => handleToggleMember(contact.id)}>
                <ListItemAvatar>
                  <Avatar alt={contact.name} src={contact.avatar} />
                </ListItemAvatar>
                <ListItemText primary={contact.name} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={() => handleToggleMember(contact.id)}
                    checked={groupMembers.indexOf(contact.id) !== -1}
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
        <DialogTitle>Edit Group Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            type="text"
            fullWidth
            value={editedGroupName}
            onChange={(e) => setEditedGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditGroupClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditGroupName} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ChatApp;
