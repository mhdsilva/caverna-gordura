import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  className?: string;
}

export const StarRating = ({ rating, totalStars = 5, className = 'text-brand-yellow' }: StarRatingProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            size={16}
            className={starValue <= rating ? 'fill-current' : 'text-gray-300'}
            fill={starValue <= rating ? 'currentColor' : 'none'}
          />
        );
      })}
    </div>
  );
}; 