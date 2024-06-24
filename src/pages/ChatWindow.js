import React, { useEffect, useRef, useState } from 'react';
import { List, ListItem, Typography, Box, Modal, Backdrop, Fade, IconButton, Link } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const ChatWindow = ({ messages }) => {
  const scrollRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const scroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scroll();
  }, [messages]);

  const handleOpenImage = (image) => setSelectedImage(image);
  const handleCloseImage = () => setSelectedImage(null);
  const handleCloseFile = () => setSelectedFile(null);

  const handleDownload = (file) => {
    const link = document.createElement('a');
    link.href = file.url;
    if (file.name) {
      link.download = file.name;
    } else {
      const fileNameFromUrl = file.url.substring(file.url.lastIndexOf('/') + 1);
      link.download = fileNameFromUrl;
    }
    link.click();
  };

  return (
    <>
      <List ref={scrollRef} sx={{ maxHeight: '100%', overflowY: 'auto', padding: 0 }}>
        {messages.map((message, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              width: '100%',
            }}
          >
            <Box
              sx={{
                // backgroundColor: 'background.paper',

                backgroundColor: message.sender === 'user' ? '#DCF8C6' : '#FFFFFF',
                padding: 2,
                borderRadius: 2,
                maxWidth: '80%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {message.type === 'text' && (
                <Typography variant="subtitle" >{message.content}</Typography>
              )}
              {message.type === 'image' && (
                <Box
                  component="img"
                  sx={{
                    height: '200px', width: '200px',
                    borderRadius: 1,
                    cursor: 'pointer',
                    objectFit: 'cover',
                  }}
                  src={message.content}
                  alt="Chat Image"
                  onClick={() => handleOpenImage(message.content)}
                />
              )}
              {message.type === 'file' && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Link
                    href={message.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ marginRight: 1, display: 'flex', alignItems: 'center' }}
                  >
                    {message.fileName}
                  </Link>
                  <IconButton onClick={() => handleDownload({ url: message.content, name: message.fileName })}>
                    <DownloadIcon />
                  </IconButton>
                </Box>
              )}
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'right' }}>
                {new Date(message.timestamp).toLocaleTimeString()}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
      <Modal
        open={!!selectedImage}
        onClose={handleCloseImage}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={!!selectedImage}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '600px',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 1,
              textAlign: 'center',
            }}
          >
            <Box
              component="img"
              sx={{ width: '100%', height: 'auto' }}
              src={selectedImage}
              alt="Expanded Chat Image"
            />
            <IconButton
              sx={{ position: 'absolute', top: 16, right: 16 }}
              onClick={() => handleDownload({ url: selectedImage, name: 'image' })}
            >
              <DownloadIcon />
            </IconButton>
          </Box>
        </Fade>
      </Modal>

      {/* Modal for displaying files */}
      <Modal
        open={!!selectedFile}
        onClose={handleCloseFile}
        closeAfterTransition

      >
        <Fade in={!!selectedFile}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '600px',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 1,
              textAlign: 'center',
            }}
          >
            <Link
              href={selectedFile?.url}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              {selectedFile?.name}
            </Link>
            <IconButton
              sx={{ position: 'absolute', top: 16, right: 16 }}
              onClick={() => handleDownload(selectedFile)}
            >
              <DownloadIcon />
            </IconButton>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ChatWindow;
