// src/pages/SearchResults.jsx

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {publicApi} from '../api/api';
import MovieCard from '../components/MovieCard'; // Um componente para exibir cada filme (código abaixo)

const SearchResults = () => {

  console.log("1. Componente SearchResults renderizou.");

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query'); // Pega o termo de busca da URL

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [totalPages, setTotalPages] = useState(0);

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
        const pageParam = currentPage - 1;
        // Chama o endpoint do backend com o termo da busca
        const response = await publicApi.get(`/api/recommendations/search?query=${query}`);
                  console.log("API respondeu com:", response.data); // Espião 3: Mostra a resposta completa da API
        if (response.data && Array.isArray(response.data.content)) {
          setMovies(response.data.content);
          setTotalPages(response.data.totalPages);
          
        }     
       } catch (err) {
        console.error("Erro ao buscar recomendações:", err);
        setError("Não foi possível carregar os resultados. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchParams]);// O useEffect agora reage a mudanças na query OU na página atual
  
  const handlePageChange = (pageNumber) => {
    const query = searchParams.get('query');
    setSearchParams({ query, page: pageNumber.toString() });
  };

   const currentPage = parseInt(searchParams.get('page') || '1', 10);

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

      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-2">
          {/* Botão de "Anterior" */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="py-2 px-4 rounded-lg font-bold bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          {/* Renderiza os números das páginas */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`py-2 px-4 rounded-lg font-bold ${
                currentPage === number
                  ? "bg-rose-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {number}
            </button>
          ))}

          {/* Botão de "Próxima" */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="py-2 px-4 rounded-lg font-bold bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;