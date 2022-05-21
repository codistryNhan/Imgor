import React, { useState } from 'react';
import styled from 'styled-components';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const imageStyle = {
  borderRadius: '3px',
  maxWidth: '100%',
  maxHeight: '400px',
  objectFit: 'contain',
};
const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '100%',
  maxHeight: '90vh',
  bgcolor: 'white',
  borderRadius: '2px',
  boxShadow: 24,
  p: 2,
};
const Image = ({ src, title }) => {
  return <img style={imageStyle} src={src} alt={title} loading='lazy' />;
};
const Video = ({ src }) => {
  return (
    <video preload='auto' autoPlay loop='loop' muted style={imageStyle}>
      <source src={src} type='video/mp4'></source>
    </video>
  );
};
const SearchTermDiv = styled.div`
  font-size: 2rem;
  font-weight: 900;
  margin: 1rem 0;
`;

const ImageResult = ({ data, isFirstLoad, searchTerm }) => {
  const [open, setOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleItemClick = (item) => {
    handleOpen();
    setModalItem(item);
  };

  return (
    <>
      {data.length > 0 && <SearchTermDiv>{searchTerm}</SearchTermDiv>}

      <ImageList variant='masonry' cols={4} gap={8}>
        {data.length === 0 && !isFirstLoad && <p>No results</p>}

        {data.length > 0 &&
          data.map((item) => {
            const { images } = item; // attempt to extract images property from item
            const img = (images && images[0]) || item; // if images exist, use first index, else use original item
            const { id, link, views, title } = img;

            return (
              <ImageListItem key={id} onClick={() => handleItemClick(img)}>
                {link.slice(-3) === 'mp4' ? ( // if the link is an mp4, use Video else use Image
                  <Video src={link} />
                ) : (
                  <Image src={link} title={title} />
                )}

                <ImageListItemBar
                  sx={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                  }}
                  subtitle={views}
                  position='bottom'
                  actionIcon={
                    <IconButton
                      sx={{ color: 'white' }}
                      aria-label={`star ${title}`}
                      size='medium'
                    >
                      <RemoveRedEyeOutlinedIcon fontSize='small' />
                    </IconButton>
                  }
                  actionPosition='left'
                />
              </ImageListItem>
            );
          })}
      </ImageList>

      {modalItem && (
        <Modal open={open} onClose={handleClose}>
          <Box sx={boxStyle}>
            {modalItem.link.slice(-3) === 'mp4' ? (
              <video preload='auto' autoPlay loop='loop' style={imageStyle}>
                <source src={modalItem.link} type='video/mp4'></source>
              </video>
            ) : (
              <img
                src={modalItem.link}
                alt={modalItem.title}
                style={{ width: '100%', height: '500px' }}
              />
            )}
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ImageResult;
