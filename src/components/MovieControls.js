import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import CloseIcon from '@mui/icons-material/Close';
import { GlobalProvider } from "../context/GlobalState";

export const MovieControls = ({ type, movie }) => {
  
  // let remove = {};

  // const { removeMovieFromWatchlist } = useContext(GlobalContext).watchlist;

  // if (typeof window !== 'undefined') {
  //   const { removeMovieFromWatchlist } = useContext(GlobalContext);
  //   console.log('remove :',removeMovieFromWatchlist)
  // }

  const { removeMovieFromWatchlist } = useContext(GlobalContext);
    // const { removeMovieFromWatchlist } = JSON.parse(
    //   typeof window !== "undefined" && useContext(GlobalContext)
    // );
  // const { removeMovieFromWatchlist } = JSON.parse(
  //   typeof window !== "undefined" && localStorage.getItem("watchlist")
  // );

  // const { removeMovieFromWatchlist } = () => typeof window !== "undefined" && useContext(GlobalContext)

  console.log('remove :', removeMovieFromWatchlist)
  
  console.log('global :',movie.id)
  //console.log('id:', movie.id)

  const handleDelete = (movie) => {
    console.log('mov:',movie)
    const watchlist = JSON.parse(localStorage.getItem('watchlist'));
    const filtered = watchlist.filter(mov => mov.id !== movie.id);
    localStorage.setItem('watchlist', JSON.stringify(filtered));
    window.location.reload(true);
  }

  return (
 
    <div className="inner-card-controls">
      
        <>{type === "watchlist" && (
          <button
            className="ctrl-btn"
            onClick={() => handleDelete(movie)}
          >
      hapus
          </button>)}
        </>
      
    </div>
  );
      
};
