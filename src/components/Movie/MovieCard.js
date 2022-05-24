import React from "react";
import { MovieControls } from "./MovieControls";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export const MovieCard = ({ movie, type }) => {
  const IMAGES_API = 'https://image.tmdb.org/t/p/w500/';

  return (
    <div className="movie">
      <img
        src={IMAGES_API + movie.poster_path}
        alt={movie.title}
      />

      <MovieControls type={type} movie={movie} />
    </div>
  );
};
