import React, { useState, useEffect } from 'react';
import MovieCarousel from '../components/MovieCarousel';
import HeroBanner from '../components/HeroBanner';
import MovieCard from '../components/MovieCard';
import { toast } from 'sonner';

// A função de busca agora é agnóstica à fonte de dados.
// Ela simplesmente busca de um endpoint do NOSSO backend.
const fetchMovies = async (endpoint) => {
  // A URL agora aponta para a nossa API, que será redirecionada pelo proxy do Vite.
  const url = `/api/movies/${endpoint}`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`HTTP error! Status: ${res.status} para o endpoint ${endpoint}`);
      return [];
    }
    const data = await res.json();
    // Nosso backend retorna o array de filmes diretamente.
    return Array.isArray(data) ? data : [];
  } catch (error) {
    toast.error(`Falha na busca para o endpoint ${endpoint}:`, error);
    console.error(`Falha na busca para o endpoint ${endpoint}:`, error);
    return [];
  }
};

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]); // Mantido caso você crie o endpoint
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllMovies = async () => {
      setLoading(true);
      
      // As chamadas agora usam os nomes dos endpoints do nosso backend.
      const results = await Promise.allSettled([
        fetchMovies('popular'),
        fetchMovies('now-playing'),
        fetchMovies('upcoming'), // Lembre-se de criar este endpoint no backend
        fetchMovies('genre/28'),   // Endpoint para Ação
        fetchMovies('genre/35'),   // Endpoint para Comédia
        fetchMovies('top-rated')
      ]);

      const filterMoviesWithPoster = (movies) => movies.filter(movie => movie.poster_path);

      const popular = results[0].status === 'fulfilled' ? filterMoviesWithPoster(results[0].value) : [];
      const nowPlaying = results[1].status === 'fulfilled' ? filterMoviesWithPoster(results[1].value) : [];
      const upcoming = results[2].status === 'fulfilled' ? filterMoviesWithPoster(results[2].value) : [];
      const action = results[3].status === 'fulfilled' ? filterMoviesWithPoster(results[3].value) : [];
      const comedy = results[4].status === 'fulfilled' ? filterMoviesWithPoster(results[4].value) : [];
      const topRated = results[5].status === 'fulfilled' ? filterMoviesWithPoster(results[5].value) : [];

      if (popular.length > 0) {
        const hero = popular.find(movie => movie.backdrop_path);
        setHeroMovie(hero || popular[0]);
        // Remove o filme do banner da lista do carrossel para não repetir
        setPopularMovies(popular.filter(movie => movie.id !== (hero || popular[0]).id));
      }

      setNowPlayingMovies(nowPlaying);
      setUpcomingMovies(upcoming);
      setActionMovies(action);
      setComedyMovies(comedy);
      setTopRatedMovies(topRated);

      setLoading(false);
    };

    loadAllMovies();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-[#F8F3ED]"><p>Carregando filmes...</p></div>;
  }

  return (
    <div className="bg-[#F8F3ED] text-[#333] w-full h-full">
      <HeroBanner movie={heroMovie} />
      
      <main className="container mx-auto py-8">
        <MovieCarousel title="EM ALTA:" movies={popularMovies} showFlameIcon={true} />
        <div className="mt-12 px-4 md:px-0">
          <h2 className="text-2xl font-bold mb-4">
            Mais Bem Avaliados
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
            {topRatedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} showLink={true} />
            ))}
          </div>
        </div>
        <MovieCarousel title="Em Cartaz" movies={nowPlayingMovies} />
        <MovieCarousel title="Em Breve" movies={upcomingMovies} />
        
        <MovieCarousel title="Ação de Tirar o Fôlego" movies={actionMovies} />
        <MovieCarousel title="Comédias para Alegrar o Dia" movies={comedyMovies} />
      </main>
    </div>
  );
};

export default Home;