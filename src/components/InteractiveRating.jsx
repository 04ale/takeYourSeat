import React, { useState } from 'react';
import { Star } from 'lucide-react';

const InteractiveRating = ({ currentRating, onRatingChange }) => {
  // Estado local apenas para o efeito visual do "hover" (passar o mouse)
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((starValue) => {
        // A estrela estará preenchida se o valor dela for menor ou igual
        // à nota do hover ou à nota clicada (o rating atual).
        const isFilled = starValue <= (hoverRating || currentRating);

        return (
          <Star
            key={starValue}
            size={40}
            className={`cursor-pointer transition-colors duration-200 ${
              isFilled ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill={isFilled ? 'currentColor' : 'none'}
            // Quando o mouse entra, atualizamos o estado de hover
            onMouseEnter={() => setHoverRating(starValue)}
            // Quando o mouse sai, limpamos o estado de hover
            onMouseLeave={() => setHoverRating(0)}
            // QUANDO CLICAMOS, CHAMAMOS A FUNÇÃO DO PAI!
            onClick={() => onRatingChange(starValue)}
          />
        );
      })}
      {/* Opcional: Mostra a nota selecionada ao lado */}
      {currentRating > 0 && (
        <span className="ml-4 text-xl font-bold text-gray-700">
          {currentRating}/5
        </span>
      )}
    </div>
  );
};

export default InteractiveRating;