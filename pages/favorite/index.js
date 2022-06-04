import * as React from 'react';
import { useState, useEffect } from 'react';
import { database } from '../../lib/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { MovieCard } from '../../src/components/Movie/MovieCard';
import { useAuth } from '../../context/AuthUserContext';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Head from 'next/head';

export default function Favorite() {
  const [movies, setMovies] = useState([]);
  const { authUser } = useAuth();

  function getMovies() {
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

  useEffect(() => {
    getMovies();
  }, [movies]);

  const handleDelete = (id) => {
    const docRef = doc(database, 'movies', id);
    deleteDoc(docRef)
      .then(() => {
        console.log('Document deleted');
      })
      .catch((error) => console.log(error.message));
  };

  console.log(777, 'movies', movies);

  return (
    <>
      <Head>
        <title>Favorite Movie</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <div>
          <h2>List Favorite Movies</h2>
        </div>

        {authUser ? (
          <div>
            {movies && movies.length > 0 ? (
              movies
                .filter((mov) => {
                  return mov.data.userId === authUser.uid;
                })
                .map((movie) => (
                  <div style={{ display: 'inline-block' }}>
                    <MovieCard movie={movie.data.movie} key={movie.id} />
                    <div style={{ paddingLeft: '90px' }}>
                      <Button
                        onClick={() => handleDelete(movie.id)}
                        style={{
                          marginLeft: 0,
                          display: 'block',
                          backgroundColor: '#131a28',
                        }}
                      >
                        <CloseIcon />
                      </Button>
                    </div>
                  </div>
                ))
            ) : (
              <h3 className="heading">No movies in your list! Add some!</h3>
            )}
          </div>
        ) : (
          <h3 className="heading">Log in first to add your favorite movie!</h3>
        )}
      </div>
    </>
  );
}
