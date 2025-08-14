// src/pages/Wishlist.jsx

import React, { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import WishlistItem from "../components/WishlistItem";
const Wishlist = () => {
  const { wishlist, loading } = useWishlist();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Lógica de Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wishlist.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="text-center p-10">Carregando sua lista...</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-[#F8F3ED] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Lista de Desejos</h1>
      </div>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500 bg-white p-10 rounded-lg shadow">
          Sua lista de desejos está vazia. Adicione filmes para vê-los aqui!
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-8">
            {currentItems.map((movie) => (
              <WishlistItem key={movie.id} movie={movie} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`py-2 px-4 rounded-lg font-bold ${
                      currentPage === number
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Wishlist;
