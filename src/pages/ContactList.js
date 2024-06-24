import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Badge, Typography } from '@mui/material';
import { format, isToday } from 'date-fns';
import { useTheme } from '@mui/material/styles';

const ContactList = ({ contacts, onSelectContact, unreadCounts }) => {
  const theme = useTheme();

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return isToday(date) ? format(date, 'p') : format(date, 'P');
  };

  const isMediaMessage = (message, messageType) => {
    if (messageType === 'image' || messageType === 'file') return true;

    const mediaExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'pdf', 'doc', 'docx'];
    const extension = message.includes('data:')
      ? message.split(';')[0].split('/')[1].toLowerCase()
      : message.split('.').pop().toLowerCase();

    return mediaExtensions.includes(extension);
  };

  const getSecondaryText = (contact) => {
    const lastMessageTimestamp = contact.lastMessageTimestamp || contact.createdAt;
    const formattedTimestamp = formatTimestamp(lastMessageTimestamp);

    let lastMessagePreview = contact.lastMessage;
    if (isMediaMessage(contact.lastMessage, contact.lastMessageType)) {
      lastMessagePreview = 'Media';
    }

    return (
      <Typography variant="body2" color="textSecondary">
        {`${lastMessagePreview} - ${formattedTimestamp}`}
      </Typography>
    );
  };

  return (
    <List>
      {contacts.map((contact) => (
        <ListItem
          key={contact.id}
          onClick={() => onSelectContact(contact.id)}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <ListItemAvatar>
            <Avatar alt={contact.name}>
              {!contact.avatar && contact.name[0]}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={contact.name}
            primaryTypographyProps={{
              style: { color: theme.palette.text.primary },
            }}
            secondary={getSecondaryText(contact)}
            secondaryTypographyProps={{
              component: 'div', // Use div to allow badge alignment
              sx: { display: 'flex', alignItems: 'center' }, // Align badge with text
            }}
          />
          {unreadCounts[contact.id] > 0 && (
            <Badge badgeContent={unreadCounts[contact.id]} color="success" sx={{ marginLeft: 1 }} />
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;
