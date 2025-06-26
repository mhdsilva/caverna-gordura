import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  className?: string;
  onChange?: (value: number) => void;
}

export const StarRating = ({
  rating,
  totalStars = 5,
  className = "text-brand-yellow",
  onChange,
}: StarRatingProps) => {
  return (
    <div
      className={`flex items-center ${className}`}
      data-testid="star-rating-root"
    >
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        if (onChange) {
          return (
            <button
              key={index}
              type="button"
              aria-label={`Avaliar com ${starValue} estrelas`}
              onClick={() => onChange(starValue)}
              data-testid="star-icon"
              className="bg-transparent border-none p-0 m-0 cursor-pointer"
            >
              <Star
                size={16}
                className={
                  starValue <= rating ? "fill-current" : "text-gray-300"
                }
                fill={starValue <= rating ? "currentColor" : "none"}
              />
            </button>
          );
        }
        return (
          <Star
            key={index}
            size={16}
            className={starValue <= rating ? "fill-current" : "text-gray-300"}
            fill={starValue <= rating ? "currentColor" : "none"}
            data-testid="star-icon"
          />
        );
      })}
    </div>
  );
};
