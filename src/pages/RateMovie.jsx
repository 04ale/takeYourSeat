import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Tv } from "lucide-react";
import MovieCarousel from "../components/MovieCarousel";
import InteractiveRating from "../components/InteractiveRating";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_IMG = import.meta.env.VITE_IMG;

const RateMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      window.scrollTo(0, 0);

      try {
        const [movieRes, relatedRes, recommendationsRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${VITE_API_KEY}&language=pt-BR`
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${VITE_API_KEY}&language=pt-BR`
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${VITE_API_KEY}&language=pt-BR`
          ),
        ]);

        const movieData = await movieRes.json();
        const relatedData = await relatedRes.json();
        const recommendationsData = await recommendationsRes.json();

        setMovie(movieData);
        setRelated(relatedData.results);
        setRecommendations(recommendationsData.results);
      } catch (error) {
        console.error("Erro ao buscar dados do filme:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading || !movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F3ED] text-[#333] p-4 md:p-8">
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center md:items-start">
          <img
            src={VITE_IMG + movie.poster_path}
            alt={movie.title}
            className="w-64 rounded-lg shadow-xl"
          />
          <div className="flex space-x-4 mt-4">
            <span className="p-2 bg-black rounded-full">
              <Tv color="white" size={20} />
            </span>
            <span className="p-2 bg-blue-500 rounded-full">
              <Tv color="white" size={20} />
            </span>
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">
            Qual sua opinião sobre {movie.title}?
          </h1>
          <textarea
            className="w-full h-40 p-4 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-rose-300"
            placeholder="Digite aqui sua avaliação"
          ></textarea>
          <div className="mt-4">
            <InteractiveRating />
          </div>
        </div>
      </section>

      <MovieCarousel title="Filmes relacionados:" movies={related} />

      <MovieCarousel
        title="Experiências que você pode curtir"
        movies={recommendations}
      />

      <footer className="text-center mt-12 border-t pt-8">
        <h3 className="font-semibold">Siga nas Redes Sociais!</h3>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="flex items-center space-x-2">
            <span>@takeurseat</span>
          </a>
          <a href="#" className="flex items-center space-x-2">
            <span>@takeurseat</span>
          </a>
          <a href="#" className="flex items-center space-x-2">
            <span>@takeurseat</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default RateMovie;
