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
    <div>
        <div className={styles.heading}>
          <h2>My Watchlist</h2>
        </div>

        <div>
            {res && res.length > 0 ? res.map((movie) => {
              return (<MovieCard movie={movie} key={movie.id} type="watchlist" />)
            }) : 
              <h2 className="no-movies">No movies in your list! Add some!</h2>
            }
        </div>
    </div>
  </>
  );
};

export default Watchlist;