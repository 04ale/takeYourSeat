import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom'; 
import MovieCard from '../components/MovieCard';

const WishlistPage = () => {
  const { toWatchList, watchedList, loading, markAsWatched, removeFromWishlist } = useWishlist();
  const navigate = useNavigate(); 

  if (loading) {
    return <div className="text-center p-10">Carregando sua lista...</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* SEÇÃO: LISTA DE DESEJOS */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Lista de Desejos</h1>
        {toWatchList.length === 0 ? (
          <p className="text-center text-gray-500">Sua lista de desejos está vazia.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
            {toWatchList.map((movie) => (
              <MovieCard key={movie.id} movie={movie}>
                <button 
                  onClick={() => markAsWatched(movie)}
                  className="w-full bg-green-500 text-white py-1.5 rounded-md text-xs font-semibold hover:bg-green-600 transition-colors"
                >
                  Já assisti
                </button>
                <button 
                  onClick={() => removeFromWishlist(movie.id)}
                  className="w-full bg-red-500 text-white py-1.5 rounded-md text-xs font-semibold hover:bg-red-600 transition-colors"
                >
                  Remover
                </button>
              </MovieCard>
            ))}
          </div>
        )}
      </div>

      {/* SEÇÃO: FILMES ASSISTIDOS */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Filmes Assistidos</h1>
        {watchedList.length === 0 ? (
          <p className="text-center text-gray-500">Você ainda não marcou nenhum filme como assistido.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
            {watchedList.map((movie) => (
              <MovieCard key={movie.id} movie={movie}>
                <button 
                  onClick={() => navigate(`/movie/${movie.id}/rate`)}
                  className="w-full bg-rose-500 text-white py-1.5 rounded-md text-xs font-semibold hover:bg-rose-600 transition-colors"
                >
                  Avaliar
                </button>
                <button 
                  onClick={() => removeFromWishlist(movie.id)}
                  className="w-full bg-gray-500 text-white py-1.5 rounded-md text-xs font-semibold hover:bg-gray-600 transition-colors"
                >
                  Remover
                </button>
              </MovieCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;