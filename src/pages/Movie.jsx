import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";

import RatingStars from "../components/RatingStars";
import MovieCarousel from "../components/MovieCarousel";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_IMG = import.meta.env.VITE_IMG;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [related, setRelated] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToWishlist, removeFromWishlist, isMovieInWishlist } =
    useWishlist();

  const getMovieData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${VITE_API_KEY}&language=pt-BR`;
      const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${VITE_API_KEY}&language=pt-BR`;
      const relatedUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${VITE_API_KEY}&language=pt-BR`;
      const recommendationsUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${VITE_API_KEY}&language=pt-BR`;

      const [movieData, creditsData, relatedData, recommendationsData] =
        await Promise.all([
          getMovieData(movieUrl),
          getMovieData(creditsUrl),
          getMovieData(relatedUrl),
          getMovieData(recommendationsUrl),
        ]);

      setMovie(movieData);
      setCredits(creditsData);
      setRelated(relatedData.results);
      setRecommendations(recommendationsData.results);

      setLoading(false);
      window.scrollTo(0, 0);
    };

    fetchAllData();
  }, [id]);

  const getDirector = () => {
    if (!credits) return "Não encontrado";
    const director = credits.crew.find((person) => person.job === "Director");
    return director ? director.name : "Não encontrado";
  };

  if (loading || !movie || !credits) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  const isInWishlist = isMovieInWishlist(movie.id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  return (
    <div className="bg-[#F8F3ED] text-[#333] p-4 md:p-8">
      <main className="container mx-auto">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <img
              src={VITE_IMG + movie.poster_path}
              alt={movie.title}
              className="w-full max-w-xs rounded-lg shadow-xl"
            />
            <div className="mt-4">
              <RatingStars rating={movie.vote_average} />
            </div>
            <Link
              to={`/movie/${id}/rate`}
              className="mt-4 bg-rose-300 text-gray-800 font-bold py-2 px-8 rounded-lg hover:bg-rose-400 transition-colors duration-300 w-full text-center"
            >
              Avaliar
            </Link>
            <button
              onClick={handleWishlistToggle}
              className={`mt-4 w-full flex cursor-pointer items-center justify-center font-bold py-2 px-8 rounded-lg transition-colors duration-300 ${
                isInWishlist
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
            >
              <Heart
                className="mr-2"
                size={20}
                fill={isInWishlist ? "currentColor" : "none"}
              />
              {isInWishlist ? "Remover da Lista" : "Adicionar à Lista"}
            </button>
          </div>

          <div className="md:col-span-2">
            <div className="flex justify-end space-x-2 mb-4"></div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {movie.title}
            </h1>
            <p className="text-lg mb-6">{movie.overview}</p>

            <div className="space-y-3 text-lg">
              <p>
                <span className="font-bold">Elenco:</span>{" "}
                {credits.cast
                  .slice(0, 2)
                  .map((actor) => actor.name)
                  .join(", ")}
              </p>
              <p>
                <span className="font-bold">Diretor:</span> {getDirector()}
              </p>
              <p>
                <span className="font-bold">Lançamento:</span>{" "}
                {new Date(movie.release_date).getFullYear()}
              </p>
              <p>
                <span className="font-bold">Gênero:</span>{" "}
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>
        </section>

        <MovieCarousel title="FILMES RELACIONADOS:" movies={related} />
        <MovieCarousel
          title="EXPERIÊNCIAS QUE VOCÊ PODE CURTIR:"
          movies={recommendations}
        />
      </main>
    </div>
  );
};

export default Movie;
