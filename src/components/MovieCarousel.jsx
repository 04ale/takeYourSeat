// src/components/MovieCarousel.jsx

import { ChevronLeft, ChevronRight, Flame } from 'lucide-react'; 
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const MovieCarousel = ({ movies, title, showFlameIcon = false }) => { 
  // Se não houver filmes, não renderiza a seção
  if (!movies || movies.length === 0) {
    return null; 
  }

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = 300;
    if (direction === 'left') current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    if (direction === 'right') current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full mt-12">
      <h2 className="flex items-center gap-2 ml-4 text-2xl font-bold mb-4">
        {showFlameIcon && <Flame className="text-red-500 fill-red-500" />}
        {title}
      </h2>

      <div className="flex items-center">
        <button
          onClick={() => scroll('left')}
          className="absolute -left-4 z-10 bg-white bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full shadow-md hidden md:block"
        >
          <ChevronLeft className="w-6 h-6 cursor-pointer" />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 p-4 scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[160px] max-w-[160px] flex-shrink-0 rounded overflow-hidden shadow-md bg-white"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[240px] object-cover"
              />
              <div className="p-2 text-sm font-semibold">
                <h3>{movie.title}</h3>
                <Link to={`/movie/${movie.id}`}>
                  <button className='bg-rose-200 rounded-md pl-2 pr-2 pt-1 pb-1 mt-2 hover:bg-rose-300 cursor-pointer transition-colors duration-300'>
                    Ver mais
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute -right-4 z-10 bg-white bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full shadow-md hidden md:block"
        >
          <ChevronRight className="w-6 h-6 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default MovieCarousel;