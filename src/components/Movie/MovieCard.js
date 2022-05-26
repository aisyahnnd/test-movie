import React from "react";


export const MovieCard = ({ movie }) => {
  const IMAGES_API = 'https://image.tmdb.org/t/p/w500/';

  return (
    <div className="movie">
      <img
        src={IMAGES_API + movie.poster_path}
        alt={movie.title || movie.name}
      />
    </div>
  );
};
