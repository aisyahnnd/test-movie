import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import CloseIcon from '@mui/icons-material/Close';
import { GlobalProvider } from "../../context/GlobalState";

export const MovieControls = ({ type, movie }) => {
  const { removeMovieFromWatchlist } = useContext(GlobalContext);

  // console.log(777,'remove :', removeMovieFromWatchlist);
  // console.log(777,'global :', movie.id);

  const handleDelete = (movie) => {
    // console.log(777,'movie:',movie)
    const watchlist = JSON.parse(localStorage.getItem('watchlist'));
    const filtered = watchlist.filter(mov => mov.id !== movie.id);
    localStorage.setItem('watchlist', JSON.stringify(filtered));
    window.location.reload(true);
  }

  return (
    <div className="inner-card-controls">
        <>
        {type === "watchlist" && (
          <button
            className="ctrl-btn"
            onClick={() => handleDelete(movie)}
          >
            Delete
          </button>)}
        </>
    </div>
  );   
};
