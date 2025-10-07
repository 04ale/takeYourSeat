import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { privateApi } from "../api/api";
import InteractiveRating from "../components/InteractiveRating";

const VITE_IMG = import.meta.env.VITE_IMG;

const RateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      setFetchError("");
      window.scrollTo(0, 0);

      try {
        const response = await fetch(`/api/movies/${id}`);
        if (!response.ok) {
          throw new Error("Filme não encontrado");
        }
        const data = await response.json();
        setMovie(data.movie);
      } catch (error) {
        console.error("Erro ao buscar dados do filme:", error);
        setFetchError("Não foi possível carregar os detalhes do filme.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

   const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setSubmitError("Por favor, selecione uma nota de 1 a 5 estrelas.");
      return;
    }
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const reviewData = {
        movieId: parseInt(id),
        rating: rating,
        comment: comment,
      };
      await privateApi.post("/api/reviews", reviewData);
      navigate("/my-reviews");

    } catch (err) {
      console.error("Erro ao enviar avaliação:", err);
      
      // A MUDANÇA ESTÁ AQUI
      // Verificamos se a resposta do erro e os dados existem, e pegamos a mensagem de 'err.response.data'
      if (err.response && err.response.data) {
        setSubmitError(err.response.data);
      } else {
        // Mensagem genérica caso a resposta não venha no formato esperado
        setSubmitError("Ocorreu um erro inesperado ao enviar sua avaliação.");
      }

    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Carregando...</p></div>;
  }

  if (fetchError) {
    return <div className="flex justify-center items-center h-screen"><p className="text-red-500">{fetchError}</p></div>;
  }

  if (!movie) {
    return <div className="flex justify-center items-center h-screen"><p>Filme não encontrado.</p></div>;
  }

  return (
    <div className="bg-[#F8F3ED] text-[#333] p-4 md:p-8">
      <section className="container mx-auto">
        <form onSubmit={handleSubmitReview} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <img
              src={VITE_IMG + movie.poster_path}
              alt={movie.title}
              className="w-64 rounded-lg shadow-xl"
            />
          </div>

          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">
              Qual sua opinião sobre {movie.title}?
            </h1>
            <p className="text-gray-600 mb-4">Deixe sua nota e comentário.</p>

            <div className="mb-4">
              <InteractiveRating currentRating={rating} onRatingChange={setRating} />
            </div>

            <textarea
              className="w-full h-40 p-4 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-rose-300"
              placeholder="Digite aqui seu comentário (opcional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            
            {submitError && <p className="text-red-500 mt-2">{submitError}</p>}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 bg-rose-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-rose-600 transition-colors w-full md:w-auto disabled:bg-gray-400"
            >
              {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default RateMovie;