// src/components/RatingStars.jsx
import React from "react";
import { Star } from "lucide-react";

const RatingStars = ({ rating }) => {
  const getStarRating = (tmdbRating) => {
    if (tmdbRating >= 8.0) {
      return 5;
    }
    if (tmdbRating >= 6.0) {
      return 4;
    }
    if (tmdbRating >= 4.0) {
      return 3;
    }
    if (tmdbRating >= 2.0) {
      return 2;
    }
    if (tmdbRating > 0) {
      return 1;
    }
    return 0;
  };

  const starRating = getStarRating(rating);

  return (
    <div className="flex items-center justify-center">
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <Star
            key={index}
            className={`mr-0.5 w-4 h-4 ${
              starIndex <= starRating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-400"
            }`}
          />
        );
      })}
    </div>
  );
};

export default RatingStars;
