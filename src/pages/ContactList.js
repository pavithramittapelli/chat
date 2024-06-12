import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const ContactList = ({ contacts, onSelectContact }) => {
  return (
    <List>
      {contacts.map((contact) => (
        <ListItem key={contact.id} onClick={() => onSelectContact(contact.id)}>
          <ListItemAvatar>
            <Avatar alt={contact.name} src={contact.avatar} />
          </ListItemAvatar>
          <ListItemText primary={contact.name} secondary={contact.lastMessage} />
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;
