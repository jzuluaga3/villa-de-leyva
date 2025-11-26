'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { getTranslation } from '@/lib/translations';

const galleryImages = [
  '/Reference/411b7bf9-e9e3-41ce-9b4c-02ee97b99572.avif',
  '/Reference/0a37dc81-94eb-4617-b4a7-7474ba4bf00c.avif',
  '/Reference/0edcef0b-d8df-484b-beac-ec3757e61e2b.avif',
  '/Reference/4b160c87-be63-415d-bc34-fbb28bb7b381.jpeg',
  '/Reference/702cb66b-dd00-4913-a072-30af113a1b7d.avif',
  '/Reference/923f708d-6e09-4bef-9dc4-793c72c07056.jpeg',
  '/Reference/fbbf7254-9260-42ae-a0f6-b36245bc3566.avif',
];

const imageSubtitles = [
  {
    es: 'Vista Exterior de la Casa con Arquitectura Colonial',
    en: 'Exterior View of the House with Colonial Architecture',
  },
  {
    es: 'Espacio de Entretenimiento y Área Social',
    en: 'Entertainment Space and Social Area',
  },
  {
    es: 'Patio Interior con Estilo Colonial',
    en: 'Indoor Patio Area with Colonial Style',
  },
  {
    es: 'Cocina Moderna y Completamente Equipada',
    en: 'Modern and Fully Equipped Kitchen',
  },
  {
    es: 'Jardines Exteriores y Vista Panorámica de la Casa',
    en: 'Outdoor Gardens and Landscape View of the House',
  },
  {
    es: 'Terraza Exterior con Vistas Espectaculares',
    en: 'Outdoor Patio with Spectacular Views',
  },
  {
    es: 'Área de Comedor al Aire Libre',
    en: 'Outdoor Dining Area',
  },
];

export function ImageGallery() {
  const { lang } = useI18n();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer for lazy loading images on scroll
  useEffect(() => {
    // Load first 3 images immediately (likely above the fold)
    const initialVisible = new Set<number>();
    for (let i = 0; i < Math.min(3, galleryImages.length); i++) {
      initialVisible.add(i);
    }
    setVisibleImages(initialVisible);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleImages((prev) => new Set(prev).add(index));
            // Unobserve once loaded
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.1,
      }
    );

    // Observe all gallery images (skip first 3 as they're already loaded)
    imageRefs.current.forEach((ref, index) => {
      if (ref && index >= 3) {
        observer.observe(ref);
      }
    });

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setLightboxIndex(index);
    // Mark this image as visible if not already (for lightbox)
    setVisibleImages((prev) => new Set(prev).add(index));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      const newIndex = lightboxIndex === 0 ? galleryImages.length - 1 : lightboxIndex - 1;
      setLightboxIndex(newIndex);
    } else {
      const newIndex = lightboxIndex === galleryImages.length - 1 ? 0 : lightboxIndex + 1;
      setLightboxIndex(newIndex);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox('prev');
    if (e.key === 'ArrowRight') navigateLightbox('next');
  };

  return (
    <>
      <section className="py-8 md:py-14 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {lang === 'es' ? 'Galería' : 'Gallery'}
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              {lang === 'es' 
                ? 'Fotos de la Casa'
                : 'Photos of the House'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image}
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                data-index={index}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => openLightbox(index)}
              >
                {visibleImages.has(index) ? (
                  <Image
                    src={image}
                    alt={lang === 'es' 
                      ? `Casa Villa de Leyva ${index + 1}` 
                      : `Villa de Leyva House ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 p-2 hover:bg-white/10 rounded-full"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('prev');
            }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-50 p-3 hover:bg-white/10 rounded-full"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('next');
            }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-50 p-3 hover:bg-white/10 rounded-full"
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            className="relative max-w-7xl w-full h-full flex items-center justify-center pb-24"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[calc(90vh-120px)]">
              <Image
                src={galleryImages[lightboxIndex]}
                alt={lang === 'es' 
                  ? `Casa Villa de Leyva ${lightboxIndex + 1}` 
                  : `Villa de Leyva House ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                quality={95}
                priority
              />
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <p className="text-white text-base md:text-lg font-medium text-center px-4 max-w-2xl">
              {imageSubtitles[lightboxIndex]?.[lang] || ''}
            </p>
            <div className="text-white/80 text-sm">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

