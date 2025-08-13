import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars'; // 1. Importe o componente de estrelas

function MovieCard({ movie, showLink = true }) {
  const imageUrl = import.meta.env.VITE_IMG;

  return (
    <div className="w-full max-w-[180px] flex flex-col items-center text-center">

      {movie?.poster_path && (
        <img
          src={imageUrl + movie.poster_path}
          alt={movie.title}
          className="w-full rounded-md"
        />
      )}
      <h2 className="mt-2 text-sm font-semibold">{movie.title}</h2>
      
      {/* 2. Substitua o <p> da avaliação pelo novo componente */}
      <div className="mt-1">
        <RatingStars rating={movie.vote_average} />
      </div>

      {showLink && (
        <Link
          to={`/movie/${movie.id}`}
          className="bg-rose-200 rounded-md pl-2 pr-2 pt-1 pb-1 mt-2 hover:bg-rose-300 cursor-pointer transition-colors duration-300"
        >
          Ver detalhes
        </Link>
      )}

    </div>
  );
}

export default MovieCard;