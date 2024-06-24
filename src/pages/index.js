export const initialContacts = [
  {
    id: 1,
    name: 'John Doe',
    avatar: '',
    lastMessage: 'Hello!',
    lastMessageTimestamp: new Date('2023-06-01T12:00:00').toISOString(),
    type: 'user',
    createdAt: new Date('2023-06-01T12:00:00').toISOString(),
    unreadMessages: 3,
    messages: [
      { type: 'text', content: 'Hello!', sender: 'contact', timestamp: new Date('2023-06-01T12:00:00').toISOString(), read: true },
      { type: 'text', content: 'Hi there!', sender: 'user', timestamp: new Date('2023-06-01T12:05:00').toISOString(), read: true },
      { type: 'text', content: 'How are you?', sender: 'contact', timestamp: new Date('2023-06-01T12:10:00').toISOString(), read: true },
      { type: 'file', fileName: 'n.txt', content: '', sender: 'user', timestamp: new Date('2023-09-01T12:10:54').toISOString(), read: true }
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: '',
    lastMessage: '',
    type: 'group',
    createdAt: new Date('2023-06-10T12:00:00').toISOString(),
    members: [1, 3],
    unreadMessages: 5,
    messages: [
      { type: 'text', content: 'Group message 1', sender: 1, timestamp: new Date('2023-06-10T12:05:00').toISOString(), read: true },
      { type: 'text', content: 'Group message 2', sender: 3, timestamp: new Date('2023-06-10T12:10:00').toISOString(), read: true },
    ],
  },
  {
    id: 3,
    name: 'Alice Johnson',
    avatar: '',
    lastMessage: 'Hey there!',
    lastMessageTimestamp: new Date('2023-06-02T15:30:00').toISOString(),
    type: 'user',
    createdAt: new Date('2023-06-02T15:30:00').toISOString(),
    unreadMessages: 1,
    messages: [
      { type: 'text', content: 'Hey there!', sender: 'user', timestamp: new Date('2023-06-02T15:30:00').toISOString(), read: true },
      { type: 'text', content: 'Hi Alice!', sender: 'contact', timestamp: new Date('2023-06-02T15:35:00').toISOString(), read: true },
    ],
  },
  {
    id: 4,
    name: 'Bob Brown',
    avatar: '',
    lastMessage: 'Good morning!',
    lastMessageTimestamp: new Date('2023-06-03T09:15:00').toISOString(),
    type: 'user',
    createdAt: new Date('2023-06-03T09:15:00').toISOString(),
    unreadMessages: 0,
    messages: [
      { type: 'text', content: 'Good morning!', sender: 'contact', timestamp: new Date('2023-06-03T09:15:00').toISOString(), read: true },
      { type: 'text', content: 'Morning Bob!', sender: 'user', timestamp: new Date('2023-06-03T09:20:00').toISOString(), read: true },],
  },
  {
    id: 5,
    name: 'Eva White',
    avatar: '',
    lastMessage: '',
    type: 'group',
    createdAt: new Date('2023-06-12T16:45:00').toISOString(),
    members: [2, 4],
    unreadMessages: 2,
    messages: [
      { type: 'text', content: 'Group message 1', sender: 2, timestamp: new Date('2023-06-12T16:45:00').toISOString(), read: true },
      { type: 'text', content: 'Group message 2', sender: 4, timestamp: new Date('2023-06-12T16:50:00').toISOString(), read: true },

    ],
  },
  {
    id: 6,
    name: 'Michael Lee',
    avatar: '',
    lastMessage: 'How are you?',
    lastMessageTimestamp: new Date('2023-06-05T11:20:00').toISOString(),
    type: 'user',
    createdAt: new Date('2023-06-05T11:20:00').toISOString(),
    unreadMessages: 0,
    messages: [
      { type: 'text', content: 'How are you?', sender: 'user', timestamp: new Date('2023-06-05T11:20:00').toISOString(), read: true },
      { type: 'text', content: 'I\'m good, thanks!', sender: 'contact', timestamp: new Date('2023-06-05T11:25:00').toISOString(), read: true },
    ],
  },
  {
    id: 7,
    name: 'Sophia Martinez',
    avatar: '',
    lastMessage: 'See you later!',
    lastMessageTimestamp: new Date('2023-06-06T18:00:00').toISOString(),
    type: 'user',
    createdAt: new Date('2023-06-06T18:00:00').toISOString(),
    unreadMessages: 4,
    messages: [
      { type: 'text', content: 'See you later!', sender: 'user', timestamp: new Date('2023-06-06T18:00:00').toISOString(), read: true },
      { type: 'text', content: 'Bye Sophia!', sender: 'contact', timestamp: new Date('2023-06-06T18:05:00').toISOString(), read: true },
    ],
  },
  {
    id: 8,
    name: 'David Wilson',
    avatar: '',
    lastMessage: '',
    type: 'group',
    createdAt: new Date('2023-06-15T10:00:00').toISOString(),
    members: [5, 6],
    unreadMessages: 0,
    messages: [
      { type: 'text', content: 'Group message 1', sender: 5, timestamp: new Date('2023-06-15T10:00:00').toISOString(), read: true },
      { type: 'text', content: 'Group message 2', sender: 6, timestamp: new Date('2023-06-15T10:05:00').toISOString(), read: true },
    ],
  },
  {
    id: 9,
    name: 'Olivia Garcia',
    avatar: '',
    lastMessage: 'Thanks!',
    lastMessageTimestamp: new Date('2023-06-08T14:30:00').toISOString(),
    type: 'user',
    createdAt: new Date('2023-06-08T14:30:00').toISOString(),
    unreadMessages: 0,
    messages: [
      { type: 'text', content: 'Thanks!', sender: 'user', timestamp: new Date('2023-06-08T14:30:00').toISOString(), read: true },
      { type: 'text', content: 'You\'re welcome!', sender: 'contact', timestamp: new Date('2023-06-08T14:35:00').toISOString(), read: true },
    ],
  },
  {
    id: 10,
    name: 'James Brown',
    avatar: '',
    lastMessage: 'What\'s up?',
    lastMessageTimestamp: new Date('2023-06-09T17:45:00').toISOString(),
    type: 'user',
    createdAt: new Date('2023-06-09T17:45:00').toISOString(),
    unreadMessages: 2,
    messages: [
      { type: 'text', content: 'What\'s up?', sender: 'user', timestamp: new Date('2023-06-09T17:45:00').toISOString(), read: true },
      { type: 'text', content: 'Not much, just chilling.', sender: 'contact', timestamp: new Date('2023-06-09T17:50:00').toISOString(), read: true },
    ],
  },
  // Add more contacts as needed...
];
