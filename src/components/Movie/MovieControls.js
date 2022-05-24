import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { database } from '../../../lib/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { GlobalProvider } from "../../context/GlobalState";

export const MovieControls = ({ type, movie }) => {
  const { removeMovieFromWatchlist } = useContext(GlobalContext);

  // console.log(777,'remove :', removeMovieFromWatchlist);
  // console.log(777,'global :', movie.id);

  const handleDelete = (id) => {
    // console.log(777,'movie:',movie)
    // const watchlist = JSON.parse(localStorage.getItem('watchlist'));
    // const filtered = watchlist.filter(mov => mov.id !== movie.id);
    // localStorage.setItem('watchlist', JSON.stringify(filtered));
    // window.location.reload(true);
    const docRef = doc(database, 'movies', id);
    deleteDoc(docRef)
    .then(() => console.log('Document deleted'))
    .catch(error => console.log(error.message))

    console.log(888,docRef)
  }

  return (
      <>
        {type === "favorite" && (
          <Button
            onClick={() => handleDelete(movie.id)}
            style={{ marginLeft: 65 }}
          >
            <CloseIcon />
          </Button>
        )}
      </>
  );   
};
