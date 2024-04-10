
import React, { useState, useEffect } from 'react';
/* import axios from 'axios';
 */import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
/* import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem.jsx'; */
import Button from './Button/Button.jsx';
import Loader from './Loader/Loader.jsx';
import Modal from './Modal/Modal.jsx';
/* import Styles from './app.module.css';
 */
import { fetchImages } from './api.js'; 

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleEscKeyPress);

    return () => {
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  }, []);

  const handleSubmit = async (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
    fetchImages(query, 1); // Corrección
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    fetchImages(query, page + 1); // Corrección
  };

  const handleOpenModal = (largeImageURL) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchImages(query, page);
        setImages(prevImages => [...prevImages, ...response.hits]);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    };

    if (query) {
      fetchData();
    }
  }, [query, page]);

  return (
    <div className='app'>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} onImageClick={handleOpenModal} />

      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}
      {showModal && <Modal largeImageURL={largeImageURL} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;

/* 
const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (query) {
      fetchImages();
    }
  }, [query]);

  const fetchImages = () => {
    const apiKey = '40998850-21238c0a5b68611eff0d55619';
    const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

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

  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
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
 */
/* const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const handleSubmit = (query) => {
    setQuery(query);
    setImages([]);
    setPage(1);
    fetchImages();
  };

  const fetchImages = () => {
    const apiKey = '40998850-21238c0a5b68611eff0d55619';
    const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

    setLoading(true);

    axios
      .get(url)
      .then((response) => {
        setImages((prevImages) => [...prevImages, ...response.data.hits]);
        setPage((prevPage) => prevPage + 1);
      })
      .catch((error) => console.error('Error fetching images:', error))
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

  const handleImageClick = (largeImageURL) => {
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
        {images.map((image) => (
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
        {showModal && <Modal onClose={handleCloseModal} largeImageURL={largeImageURL} />}
      </div>
    </div>
  );
};

export default App;
 */
