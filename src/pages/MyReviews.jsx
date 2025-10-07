import React, { useState, useEffect } from "react";
import {privateApi} from "../api/api";
import UserReviewItem from "../components/UserReviewItem";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        setLoading(true);
        const response = await privateApi.get("/api/reviews/me");
        setReviews(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, []);

   const handleUpdateReview = async (reviewId, updatedData) => {
    try {
      const response = await privateApi.put(`/api/reviews/${reviewId}`, updatedData);
      // Atualiza a lista local com os dados retornados pela API
      setReviews(currentReviews =>
        currentReviews.map(r => (r.id === reviewId ? response.data : r))
      );
    } catch (err) {
      console.error("Erro ao atualizar avaliação:", err);
      setError("Não foi possível salvar as alterações.");
    }
  };

   const handleDeleteReview = async (reviewId) => {
    try {
      await privateApi.delete(`/api/reviews/${reviewId}`);
      // Remove a avaliação da lista local para uma atualização instantânea da UI
      setReviews(currentReviews => currentReviews.filter(r => r.id !== reviewId));
    } catch (err) {
      console.error("Erro ao deletar avaliação:", err);
      setError("Não foi possível deletar a avaliação.");
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-[#F8F3ED] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Minhas Avaliações
      </h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-center">Carregando suas avaliações...</p>
      ) : reviews.length > 0 ? (
        <div className="flex flex-col gap-6">
          {reviews.map((review) => (
            <UserReviewItem
              key={review.id}
              review={review}
              onUpdate={handleUpdateReview} 
              onDelete={handleDeleteReview}
            />
          ))}
        </div>
      ) : (
        <p className="bg-white p-10 rounded-lg shadow text-center text-gray-500">
          Você ainda não fez nenhuma avaliação.
        </p>
      )}
    </div>
  );
};

export default MyReviews;
