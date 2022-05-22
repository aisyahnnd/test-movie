import * as React from 'react';
import { MovieCard } from '../../src/components/Movie/MovieCard';
import styles from './watchlist.module.css';
import Head from 'next/head';

const Watchlist = () => {
  const res = JSON.parse(
    typeof window !== "undefined" && localStorage.getItem("watchlist")
  );

  return (
  <>
    <Head>
      <title>Favorite Movie</title>
    </Head>
    <div className={styles.movieCard}>
      <div className="container">
        <div className="header">
          <h1 className="heading">My Watchlist</h1>
        </div>

        <div>
            {res && res.length > 0 ? res.map((movie) => {
              return (<MovieCard movie={movie} key={movie.id} type="watchlist" />)
            }) : 
              <h2 className="no-movies">No movies in your list! Add some!</h2>
            }
        </div>
      </div>
    </div></>
  );
};

export default Watchlist;