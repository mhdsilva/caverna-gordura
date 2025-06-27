import React from "react";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
              key={`star-button-${starValue}`}
              type="button"
              aria-label={t("starAria", { count: starValue })}
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
            key={`star-${starValue}`}
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
