import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { XCircle } from "lucide-react";

const VITE_IMG = import.meta.env.VITE_IMG;

const WishlistItem = ({ movie }) => {
  const { removeFromWishlist } = useWishlist();

  const getYear = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden w-full relative border border-gray-200">
      <button
        onClick={() => removeFromWishlist(movie.id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
        title="Remover da lista"
      >
        <XCircle size={24} />
      </button>

      <div className="w-full md:w-1/4">
        <img
          src={`${VITE_IMG}${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-3/4 p-6 flex flex-col">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {movie.title}
        </h2>

        <div className="text-gray-600 space-y-2 mb-4">
          <p>
            <span className="font-bold">Elenco:</span>{" "}
            {movie.cast || "Não informado"}
          </p>
          <p>
            <span className="font-bold">Diretor:</span>{" "}
            {movie.director || "Não informado"}
          </p>
          <p>
            <span className="font-bold">Lançamento:</span>{" "}
            {getYear(movie.release_date)}
          </p>
        </div>

        <div className="mt-auto flex items-center space-x-4">
          <button className="bg-green-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 transition-colors">
            Já Assisti
          </button>
          <button className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition-colors">
            Na Fila
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
