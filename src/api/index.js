const IMGUR_CLIENT_ID = 'b067d5cb828ec5a';
const IMGUR_SEARCH_URL = 'https://api.imgur.com/3/gallery/search';

export const searchImages = (searchTerm, page = 0) => {
  const url = `${IMGUR_SEARCH_URL}/${page}?`;

  return fetch(url + new URLSearchParams({ q: searchTerm }), {
    method: 'GET',
    headers: {
      Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
    },
  });
};
