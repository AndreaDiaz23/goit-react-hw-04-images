import axios from 'axios';

const fetchImages = async (query, page) => {
  const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=41602641-335399080deea0c2e9177ea96&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(url);
  return response.data;
};

export { fetchImages };