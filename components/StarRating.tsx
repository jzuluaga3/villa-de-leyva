'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({ rating, reviewCount, size = 'md' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const starSize = sizeClasses[size];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={i} className={`${starSize} fill-yellow-400 text-yellow-400`} />
        ))}
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative inline-block">
            <Star className={`${starSize} fill-gray-300 text-gray-300`} />
            <div className="absolute left-0 top-0 overflow-hidden" style={{ width: '50%' }}>
              <Star className={`${starSize} fill-yellow-400 text-yellow-400`} />
            </div>
          </div>
        )}
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={i} className={`${starSize} fill-gray-300 text-gray-300`} />
        ))}
      </div>
      <span className="text-sm font-semibold text-text-primary ml-1">
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && reviewCount > 0 && (
        <span className="text-xs text-text-secondary ml-1">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}

