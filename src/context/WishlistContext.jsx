import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    if (localStorage.getItem("jwt_token")) {
      try {
        setLoading(true);
        const response = await api.get("/api/wishlist");
        setWishlist(response.data || []);
      } catch (error) {
        console.error("Falha ao buscar a lista de desejos:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("jwt_token");
          setWishlist([]);
        }
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setWishlist([]);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToWishlist = async (movie) => {
    try {
      await api.post(`/api/wishlist/${movie.id}`);
      setWishlist((prev) => [...prev, movie]);
    } catch (error) {
      console.error("Erro ao adicionar à lista de desejos:", error);
      alert("Você precisa estar logado para adicionar filmes!");
    }
  };

  const removeFromWishlist = async (movieId) => {
    try {
      await api.delete(`/api/wishlist/${movieId}`);
      setWishlist((prev) => prev.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error("Erro ao remover da lista de desejos:", error);
    }
  };

  const isMovieInWishlist = (movieId) => {
    return wishlist.some((movie) => movie.id === movieId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        isMovieInWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};
