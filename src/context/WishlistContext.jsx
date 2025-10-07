import React, { createContext, useContext, useState, useEffect } from "react";
import { privateApi } from "../api/api";
import { useAuth } from './AuthContext'; // 1. Importa o novo hook de autenticação

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [toWatchList, setToWatchList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);
  const [loading, setLoading] = useState(false); // Inicia como 'false'

  // 2. Pega o estado de login e a função logout do AuthContext
  const { isLoggedIn, logout } = useAuth();

  // 3. O useEffect agora reage à mudança do estado de login
  useEffect(() => {
    const fetchWishlist = async () => {
      // Só tenta buscar os dados se o usuário estiver logado
      if (isLoggedIn) {
        try {
          setLoading(true);
          const response = await privateApi.get("/api/wishlist");
          setToWatchList(response.data.toWatch || []);
          setWatchedList(response.data.watched || []);
        } catch (error) {
          console.error("Falha ao buscar as listas:", error);
          // Se o token for inválido/expirado, o AuthContext fará o logout
          if (error.response?.status === 401 || error.response?.status === 403) {
            logout();
          }
        } finally {
          setLoading(false);
        }
      } else {
        // Se o usuário não está logado, garante que as listas estejam vazias
        setToWatchList([]);
        setWatchedList([]);
      }
    };

    fetchWishlist();
  }, [isLoggedIn, logout]); // Depende de 'isLoggedIn' para re-executar

  const addToWishlist = async (movie) => {
    try {
      await privateApi.post(`/api/wishlist/${movie.id}`);
      // Atualização otimista da UI
      setToWatchList((prev) => [movie, ...prev]);
    } catch (error) {
      console.error("Erro ao adicionar à lista de desejos:", error);
    }
  };

  const removeFromWishlist = async (movieId) => {
    try {
      await privateApi.delete(`/api/wishlist/${movieId}`);
      // Atualização otimista da UI
      setToWatchList((prev) => prev.filter((movie) => movie.id !== movieId));
      setWatchedList((prev) => prev.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error("Erro ao remover da lista de desejos:", error);
    }
  };
  
  const markAsWatched = async (movie) => {
    try {
      await privateApi.put(`/api/wishlist/${movie.id}/watch`);
      // Atualização otimista da UI
      setToWatchList((prev) => prev.filter((item) => item.id !== movie.id));
      setWatchedList((prev) => [movie, ...prev]);
    } catch (error) {
      console.error("Erro ao marcar filme como assistido:", error);
    }
  };

  const isMovieInWishlist = (movieId) => {
    const isInToWatch = toWatchList.some((movie) => movie.id === movieId);
    const isInWatched = watchedList.some((movie) => movie.id === movieId);
    return isInToWatch || isInWatched;
  };

  // As funções de login e logout foram removidas daqui, pois agora pertencem ao AuthContext
  const value = {
    toWatchList,
    watchedList,
    loading,
    addToWishlist,
    removeFromWishlist,
    isMovieInWishlist,
    markAsWatched,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};