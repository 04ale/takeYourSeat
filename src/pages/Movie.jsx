import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";

import RatingStars from "../components/RatingStars";
import MovieCarousel from "../components/MovieCarousel";

// REMOVEMOS A NECESSIDADE DA CHAVE DE API E URL BASE DO TMDB
const VITE_IMG = import.meta.env.VITE_IMG;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  // Simplificamos o estado: agora temos cast e director separados
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");
  const [related, setRelated] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToWishlist, removeFromWishlist, isMovieInWishlist } =
    useWishlist();

  // A função auxiliar foi removida, pois faremos a chamada diretamente
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      
      // 1. UMA ÚNICA CHAMADA PARA O NOSSO BACKEND
      const url = `/api/movies/${id}`;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Erro ao buscar detalhes do filme: ${res.status}`);
        }
        const data = await res.json(); // data é o nosso MovieDetailsDTO completo

        // 2. POPULAMOS TODOS OS ESTADOS A PARTIR DE UMA ÚNICA RESPOSTA
        setMovie(data.movie);
        setCast(data.cast || []);
        setDirector(data.director || "Não encontrado");
        setRelated(data.similarMovies || []);
        setRecommendations(data.recommendedMovies || []);

      } catch (error) {
        console.error(error);
        // Opcional: setar um estado de erro para exibir na UI
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchAllData();
  }, [id]);

  // A função getDirector() não é mais necessária!
  
  if (loading || !movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  // O resto do seu JSX continua quase o mesmo, apenas ajustamos
  // como ele acessa os dados do elenco e do diretor

  const isInWishlist = isMovieInWishlist(movie.id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie); // O objeto 'movie' já contém os dados necessários
    }
  };

  return (
    <div className="bg-[#F8F3ED] text-[#333] p-4 md:p-8">
      <main className="container mx-auto">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna da Imagem e Botões (sem alterações) */}
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

          {/* Coluna de Detalhes do Filme */}
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {movie.title}
            </h1>
            <p className="text-lg mb-6">{movie.overview}</p>

            {/* AQUI ESTÁ A MUDANÇA EM COMO EXIBIMOS OS DADOS */}
            <div className="space-y-3 text-lg">
              <p>
                <span className="font-bold">Elenco:</span>{" "}
                {cast
                  .slice(0, 5) // Podemos até mostrar mais atores agora
                  .map((actor) => actor.name)
                  .join(", ")}
              </p>
              <p>
                <span className="font-bold">Diretor:</span> {director}
              </p>
              <p>
                <span className="font-bold">Lançamento:</span>{" "}
                {new Date(movie.release_date).getFullYear()}
              </p>
              <p>
                <span className="font-bold">Gênero:</span>{" "}
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
                {movie.watchProviders && movie.watchProviders.length > 0 && (
               <div className="pt-4">
                 <p className="font-bold text-lg">Disponível em:</p>
               <div className="flex flex-wrap items-center gap-4 mt-2">
                 {/* A MUDANÇA ESTÁ AQUI ABAIXO */}
                  {movie.watchProviders.map((provider) => (
                  <img 
                    key={provider.provider_name} // MUDANÇA: de providerName para provider_name
                    src={VITE_IMG + provider.logo_path} // MUDANÇA: de logoPath para logo_path
                    alt={provider.provider_name} // MUDANÇA: de providerName para provider_name
                    title={provider.provider_name} // MUDANÇA: de providerName para provider_name
                    className="w-12 h-12 rounded-lg shadow-md"
                  />
            ))}
                    </div>
                 </div>
              )}
            </div>
          </div>
        </section>

        {/* Carrosséis (sem alterações) */}
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