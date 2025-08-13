// src/components/RatingStars.jsx
import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating }) => {
  /**
   * Converte a nota do TMDB (0 a 10) para uma escala de 0 a 5 estrelas
   * com a nova regra: 5 estrelas a partir da nota 7.5.
   * @param {number} tmdbRating - A nota original do filme.
   * @returns {number} - O número de estrelas (0 a 5).
   */
  const getStarRating = (tmdbRating) => {
    if (tmdbRating >= 8.0) {
      return 5; // 5 estrelas para notas >= 7.5
    }
    if (tmdbRating >= 6.0) {
      return 4; // 4 estrelas para notas >= 6.0
    }
    if (tmdbRating >= 4.0) {
      return 3; // 3 estrelas para notas >= 4.0
    }
    if (tmdbRating >= 2.0) {
      return 2; // 2 estrelas para notas >= 2.0
    }
    if (tmdbRating > 0) {
      return 1; // 1 estrela para qualquer nota acima de 0
    }
    return 0; // 0 estrelas para nota 0
  };

  // Calcula o número de estrelas com base na nota do filme
  const starRating = getStarRating(rating);

  return (
    <div className="flex items-center justify-center">
      {/* Cria um array de 5 posições para renderizar as estrelas */}
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <Star
            key={index}
            className={`mr-0.5 w-4 h-4 ${
              starIndex <= starRating
                ? 'text-yellow-500 fill-yellow-500' // Estrela preenchida
                : 'text-gray-400'                   // Estrela vazia
            }`}
          />
        );
      })}
    </div>
  );
};

export default RatingStars;