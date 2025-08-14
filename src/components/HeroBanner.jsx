// src/components/HeroBanner.jsx

import React from "react";
import { Link } from "react-router-dom";

const VITE_BACKDROP_IMG = "https://image.tmdb.org/t/p/original";

const HeroBanner = ({ movie }) => {
  if (!movie) {
    return <div className="w-full h-[60vh] bg-gray-200 animate-pulse"></div>;
  }

  const overview =
    movie.overview.length > 200
      ? movie.overview.substring(0, 200) + "..."
      : movie.overview;

  const backgroundStyle = {
    backgroundImage: `url(${VITE_BACKDROP_IMG}${movie.backdrop_path})`,
  };

  return (
    <div
      className="w-full h-[70vh] bg-cover bg-center bg-no-repeat relative text-white"
      style={backgroundStyle}
    >
      <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

      <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12 container mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          {movie.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg drop-shadow-lg hidden md:block">
          {overview}
        </p>
        <div className="mt-6">
          <Link
            to={`/movie/${movie.id}`}
            className="bg-rose-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-rose-600 transition-colors duration-300 text-lg"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
