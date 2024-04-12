import React, { useState, useRef } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem.jsx';
import Button from './Button/Button.jsx';
import Loader from './Loader/Loader.jsx';
import Modal from './Modal/Modal.jsx';
import Styles from './app.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const queryRef = useRef('');

  const handleSubmit = query => {
    queryRef.current = query;
    setImages([]);
    setPage(1);
    fetchImages();
  };

  const fetchImages = () => {
    const apiKey = '43362690-7537358f136f27b1a84d49a02';
    const url = `https://pixabay.com/api/?q=${queryRef.current}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

    setLoading(true);

    axios
      .get(url)
      .then(response => {
        setImages(prevImages => [...prevImages, ...response.data.hits]);
        setPage(prevPage => prevPage + 1);
      })
      .catch(error => console.error('Error fetching images:', error))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLoadMore = async () => {
    await fetchImages();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleImageClick = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
    <div className={Styles.App}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            alt={image.tags}
            onClick={() => handleImageClick(image.largeImageURL)}
          />
        ))}
      </ImageGallery>
      <div className={Styles.Button_container}>
        {loading && <Loader />}
        {images.length > 0 && !loading && <Button onClick={handleLoadMore} />}
        {showModal && (
          <Modal onClose={handleCloseModal} largeImageURL={largeImageURL} />
        )}
      </div>
    </div>
  );
};

export default App;
