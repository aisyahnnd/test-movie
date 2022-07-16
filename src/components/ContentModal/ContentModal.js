import React from 'react';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { database } from '../../../lib/firebase';
import { useAuth } from '../../../context/AuthUserContext';
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { img_500, unavailable } from '../../config/config';
import styles from './ContentModal.module.css';
import Paper from '@mui/material/Paper';

export default function ContentModal({ children, media_type, id, movie }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { authUser } = useAuth();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchData();
    getData();
  }, [movies]);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    );

    setContent(data);
  };

  const handleSubmit = async () => {
    const docRef = collection(database, 'movies');
    await addDoc(docRef, { movie, userId: authUser.uid, email: authUser.email })
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  function getData() {
    const movieCollectionRef = collection(database, 'movies');
    getDocs(movieCollectionRef)
      .then((response) => {
        const movs = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setMovies(movs);
      })
      .catch((error) => console.log(error.message));
  }

  let storedMovieFavorite = movies.find((fal) => {
    return authUser ? fal.data.userId === authUser.uid && fal.data.movie.id === movie.id : null;
  });

  const favoriteDisabled = storedMovieFavorite ? true : false;

  return (
    <>
      <div
        className={styles.media}
        style={{ cursor: 'pointer' }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {content && (
          <Paper
            sx={{
              width: '60%',
              height: '70%',
              backgroundColor: '#39445a',
              borderRadius: 10,
              color: 'white',
              padding: 2,
            }}
          >
            <div className={styles.ContentModal}>
              <img
                src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable}
                alt={content.name || content.title}
                className={styles.ContentModal__portrait}
              />
              <div className={styles.ContentModal__about}>
                <span className={styles.ContentModal__title}>
                  {content.name || content.title} - {''}
                  {(content.first_air_date || content.release_date || '-----').substring(0, 4)}
                </span>

                <span className={styles.ContentModal__description}>{content.overview}</span>
                {authUser ? (
                  <Button
                    variant="contained"
                    color="primary"
                    target="__blank"
                    disabled={favoriteDisabled}
                    onClick={() => handleSubmit()}
                  >
                    ADD TO FAVORITE
                  </Button>
                ) : (
                  <Button variant="contained" color="primary" target="__blank" disabled>
                    ADD TO FAVORITE
                  </Button>
                )}
              </div>
            </div>
          </Paper>
        )}
      </Modal>
    </>
  );
}
