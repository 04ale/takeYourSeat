import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RatingStars from "./RatingStars";

function MovieCard({ movie, children }) {
  const imageUrl = import.meta.env.VITE_IMG;

  return (
    <div className="w-full max-w-[180px] flex flex-col items-center text-center bg-white rounded-lg shadow-md overflow-hidden pb-3">
      {/* O Link agora envolve apenas a parte que leva para os detalhes (imagem e título) */}
      <Link to={`/movie/${movie.id}`} className="w-full no-underline text-inherit">
        {movie?.poster_path ? (
          <img
            src={imageUrl + movie.poster_path}
            alt={movie.title}
            className="w-full h-[270px] object-cover"
          />
        ) : (
          <div className="w-full h-[270px] bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-xs">Sem Imagem</span>
          </div>
        )}
        <h2 className="mt-2 text-sm font-semibold h-10 px-2 flex items-center justify-center">
          {movie.title}
        </h2>
      </Link>
      
      <div className="mt-1">
        <RatingStars rating={movie.vote_average} />
      </div>

      {/* AQUI É A MÁGICA: Renderiza quaisquer botões que forem passados para o componente */}
      {children && (
        <div className="w-full px-2 mt-2 flex flex-col gap-1.5">
          {children}
        </div>
      )}
    </div>
  );
};

export default MovieCard;
