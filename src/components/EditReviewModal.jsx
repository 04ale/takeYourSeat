import React, { useState } from 'react';
import InteractiveRating from './InteractiveRating';
import { X } from 'lucide-react';

const EditReviewModal = ({ review, onClose, onSave }) => {
  // Estados locais para o formulário, inicializados com os dados da avaliação atual
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (rating === 0) {
      setError('A nota não pode ser zero.');
      return;
    }
    // Chama a função onSave do componente pai, passando os novos dados
    onSave(review.id, { rating, comment });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Editar Avaliação</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Sua Nota:</label>
            <InteractiveRating currentRating={rating} onRatingChange={setRating} />
          </div>
          <div>
            <label className="font-semibold">Seu Comentário:</label>
            <textarea
              className="w-full h-32 p-2 border rounded-md"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
            Cancelar
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded-md bg-rose-500 text-white hover:bg-rose-600">
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;