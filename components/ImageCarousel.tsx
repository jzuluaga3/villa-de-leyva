'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

export function ImageCarousel({ images, alt, className }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  if (!images || images.length === 0) {
    return null;
  }

  const handleImageError = (imageUrl: string) => {
    setFailedImages((prev) => new Set(prev).add(imageUrl));
  };

  // Filter out failed images
  const validImages = images.filter((url) => !failedImages.has(url));
  
  useEffect(() => {
    // Adjust currentIndex if current image failed
    if (failedImages.has(images[currentIndex]) && validImages.length > 0) {
      const newIndex = images.findIndex((url) => validImages.includes(url) && !failedImages.has(url));
      if (newIndex >= 0) {
        setCurrentIndex(newIndex);
      }
    }
  }, [failedImages, images, currentIndex, validImages]);

  if (validImages.length === 0) {
    return null;
  }

  // Find the valid index that corresponds to currentIndex
  let displayIndex = 0;
  let displayImage = validImages[0];
  
  for (let i = 0; i < images.length; i++) {
    if (i === currentIndex && !failedImages.has(images[i])) {
      displayImage = images[i];
      displayIndex = validImages.indexOf(images[i]);
      break;
    }
  }

  const goToPrevious = () => {
    const currentValidIndex = validImages.indexOf(displayImage);
    const newValidIndex = currentValidIndex === 0 ? validImages.length - 1 : currentValidIndex - 1;
    const newOriginalIndex = images.indexOf(validImages[newValidIndex]);
    setCurrentIndex(newOriginalIndex >= 0 ? newOriginalIndex : 0);
  };

  const goToNext = () => {
    const currentValidIndex = validImages.indexOf(displayImage);
    const newValidIndex = currentValidIndex === validImages.length - 1 ? 0 : currentValidIndex + 1;
    const newOriginalIndex = images.indexOf(validImages[newValidIndex]);
    setCurrentIndex(newOriginalIndex >= 0 ? newOriginalIndex : 0);
  };

  const goToSlide = (validIndex: number) => {
    const originalIndex = images.indexOf(validImages[validIndex]);
    if (originalIndex >= 0) {
      setCurrentIndex(originalIndex);
    }
  };

  if (validImages.length === 1) {
    return (
      <div className={cn('relative w-full h-48 overflow-hidden rounded-lg', className)}>
        <Image
          src={validImages[0]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => handleImageError(validImages[0])}
        />
      </div>
    );
  }

  return (
    <div 
      className={cn('relative w-full h-48 overflow-hidden rounded-lg group', className)}
    >
      {/* Main Image */}
      <div className="relative w-full h-full">
        <Image
          key={displayImage}
          src={displayImage}
          alt={`${alt} - Image ${displayIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => handleImageError(displayImage)}
        />
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          goToPrevious();
        }}
        onMouseDown={(e) => e.preventDefault()}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 active:bg-black text-white rounded-full p-2 shadow-lg transition-all duration-200 z-30 cursor-pointer touch-manipulation"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          goToNext();
        }}
        onMouseDown={(e) => e.preventDefault()}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 active:bg-black text-white rounded-full p-2 shadow-lg transition-all duration-200 z-30 cursor-pointer touch-manipulation"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      {validImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
          {validImages.map((imageUrl, validIndex) => (
            <button
              key={imageUrl}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(validIndex);
              }}
              onMouseDown={(e) => e.preventDefault()}
              className={cn(
                'rounded-full transition-all duration-200 cursor-pointer touch-manipulation shadow-md',
                imageUrl === displayImage
                  ? 'bg-white w-6 h-2'
                  : 'bg-white/70 hover:bg-white/90 w-2 h-2'
              )}
              aria-label={`Go to image ${validIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
