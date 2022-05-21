import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import useImages from '../hooks/useImages';
import SearchBar from './SearchBar';
import ImageResult from './ImageResult';
import logo from '../images/search.png';

const Header = styled.h1`
  color: white;
  display: flex;
  align-items: center;
  margin: 1.25rem 0 0.75rem 0;
`;

const App = () => {
  const [images, { searchImages, loadMore, hasMore }] = useImages();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (value) => {
    setIsLoading(true);
    if (isFirstLoad) {
      setIsFirstLoad(false);
    }
    setSearchTerm(value);
    await searchImages(value);
    setIsLoading(false);
  };

  React.useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <div className='App'>
      <Container maxWidth='md'>
        <Header>
          <img
            src={logo}
            alt='logo'
            width='28px'
            height='28px'
            style={{ marginRight: '0.25rem' }}
          />

          <a href='/'>Imgor</a>
        </Header>
        <div style={{ margin: '0.75rem 0 1rem 0' }}>
          <SearchBar onSubmit={handleSearch} />
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ImageResult
            data={images}
            isFirstLoad={isFirstLoad}
            searchTerm={searchTerm}
          />
        )}

        {hasMore() && (
          <Button
            fullWidth
            color='info'
            variant='outlined'
            endIcon={<ArrowDropDownIcon />}
            onClick={() => loadMore(searchTerm)}
          >
            More
          </Button>
        )}
      </Container>
    </div>
  );
};

export default App;
