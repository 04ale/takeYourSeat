import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import RatingStars from './RatingStars';
import EditReviewModal from './EditReviewModal';

const VITE_IMG = import.meta.env.VITE_IMG;

// Este componente agora recebe as funções de update e delete como props
const UserReviewItem = ({ review, onUpdate, onDelete }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Busca os detalhes do filme (pôster e título) para dar contexto à avaliação
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movies/${review.movieId}`);
        const data = await response.json();
        setMovieDetails(data.movie);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme para a avaliação:", error);
      }
    };
    fetchMovie();
  }, [review.movieId]);

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja deletar esta avaliação?')) {
      onDelete(review.id);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex gap-4">
      {movieDetails && (
        <img
          src={VITE_IMG + movieDetails.poster_path}
          alt={movieDetails.title}
          className="w-24 h-36 object-cover rounded-md hidden sm:block"
        />
      )}
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{movieDetails?.title || `Filme ID: ${review.movieId}`}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <RatingStars rating={review.rating * 2} />
              <span>• Avaliado em {new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button onClick={() => setIsEditing(true)} title="Editar" className="text-blue-500 hover:text-blue-700">
              <Edit size={20} />
            </button>
            <button onClick={handleDelete} title="Deletar" className="text-red-500 hover:text-red-700">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
        <p className="mt-2 text-gray-700">{review.comment}</p>
      </div>

      {/* O modal de edição só é renderizado quando isEditing for true */}
      {isEditing && (
        <EditReviewModal
          review={review}
          onClose={() => setIsEditing(false)}
          onSave={(reviewId, updatedData) => {
            onUpdate(reviewId, updatedData);
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
};

export default UserReviewItem;