import React, { useState, useEffect } from "react";
import api from "../api/api";
import UserReviewItem from "../components/UserReviewItem";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/reviews/me");
        setReviews(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 bg-[#F8F3ED] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Minhas Avaliações
      </h1>

      {loading ? (
        <p className="text-center">Carregando suas avaliações...</p>
      ) : reviews.length > 0 ? (
        <div className="flex flex-col gap-6">
          {reviews.map((review) => (
            <UserReviewItem key={review.id} review={review} />
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
