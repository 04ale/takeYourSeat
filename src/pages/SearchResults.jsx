// src/pages/SearchResults.jsx

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {publicApi} from '../api/api';
import MovieCard from '../components/MovieCard'; // Um componente para exibir cada filme (código abaixo)

const SearchResults = () => {

    console.log("1. Componente SearchResults renderizou.");

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query'); // Pega o termo de busca da URL

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para buscar os filmes na API

        console.log("2. useEffect foi ativado.");
    const fetchMovies = async () => {
      if (!query) {

              console.log("3. O valor de 'query' é:", query);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setMovies([]);

      try {
                console.log("4. Prestes a chamar a API com a query:", query);
        // Chama o endpoint do backend com o termo da busca
        const response = await publicApi.get(`/api/recommendations/search?query=${query}`);
          
        if (response.data && Array.isArray(response.data.content)) {
          setMovies(response.data.content);
          
        }      } catch (err) {
        console.error("Erro ao buscar recomendações:", err);
        setError("Não foi possível carregar os resultados. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]); // O 'useEffect' roda sempre que o 'query' na URL mudar

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">
        Resultados para: <span className="text-rose-500">"{query}"</span>
      </h1>

      {isLoading && <p className="text-center text-xl">Buscando recomendações... 🤖</p>}
      {error && <p className="text-center text-red-500 text-xl">{error}</p>}
      
      {!isLoading && !error && movies.length === 0 && (
        <p className="text-center text-xl">Nenhum filme encontrado para esta busca.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;