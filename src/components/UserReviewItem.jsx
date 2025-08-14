// src/components/UserReviewItem.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_IMG = import.meta.env.VITE_IMG;

const UserReviewItem = ({ review }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieUrl = `https://api.themoviedb.org/3/movie/${review.movieId}?api_key=${VITE_API_KEY}&language=pt-BR`;
      try {
        const res = await fetch(movieUrl);
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    };

    fetchMovieDetails();
  }, [review.movieId]);

  if (!movie) {
    return (
      <div className="bg-white p-4 rounded-lg shadow animate-pulse">
        Carregando avaliação...
      </div>
    );
  }

  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="w-1/4 md:w-1/5">
        <Link to={`/movie/${movie.id}`}>
          <img
            src={`${VITE_IMG}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      <div className="w-3/4 md:w-4/5 p-4 flex flex-col">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="text-xl font-bold text-gray-800 hover:underline">
            {movie.title}
          </h3>
        </Link>
        <div className="my-2">
          <RatingStars rating={review.rating * 2} />
        </div>
        <p className="text-gray-600 italic">"{review.comment}"</p>
      </div>
    </div>
  );
};

export default UserReviewItem;
