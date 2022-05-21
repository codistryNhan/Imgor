import { useState } from 'react';
import { searchImages as _searchImages } from '../api';

const useImages = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);

  const searchImages = async (searchTerm) => {
    setPage(0);
    const result = await _searchImages(searchTerm);
    const data = await result.json();
    setImages(data.data);
  };

  const loadMore = async (searchTerm) => {
    const result = await _searchImages(searchTerm, page + 1);
    const data = await result.json();
    setPage(page + 1);
    setImages([...images, ...data.data]);
  };

  /*
    1 request returns a max of 60 items
    if a request returns less than 60 items, 
    means it doesn't have any more
  */
  const hasMore = () => {
    let max = (page + 1) * 60;
    return images.length === max;
  };

  return [images, { searchImages, loadMore, hasMore }];
};

export default useImages;
