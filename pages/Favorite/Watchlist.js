import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../src/context/GlobalState";
import * as React from 'react';
import Box from '@mui/material/Box';
import SingleContent from "../../src/components/SingleContent/SingleContent";
import { MovieCard } from '../../src/components/MovieCard';



const Watchlist = ({ watchlist }) => {

  // let res = [];

  // if (typeof window !== 'undefined') {
    
  // }
//  const [res, setRes] = useState(typeof window !== 'undefined' && useContext(GlobalContext).watchlist);

  // const res = useContext(GlobalContext).watchlist;
    console.log(777,'haloo :',watchlist);
    // console.log(777,'haloo :',useContext(GlobalContext).watchlist);



  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">My Watchlist</h1>

          {/* <span className="count-pill">
            {watchlist.length} {watchlist.length === 1 ? "Movie" : "Movies"}
          </span> */}
        </div>

        <div>

            {/* {res && res.length > 0 ? res.map((movie) => {
              return (<MovieCard movie={movie} key={movie.id} type="watchlist" />)
            }) : null} */}
            
          </div>

        {/* {watchlist.length > 0 ? (
          <div className="movie-grid">
            {watchlist.map((movie) => (
              <SingleContent media_type={media_type} id={id} type="watchlist" />
            ))}
            
          </div>
        ) : (
          <h2 className="no-movies">No movies in your list! Add some!</h2>
        )} */}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = useContext(GlobalContext);
 console.log('res',res);
  return {
    props: {
      watchlist: res,
    },
  };
}

export default Watchlist;