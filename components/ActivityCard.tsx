'use client';

import { ExternalLink, MapPin, Mountain, BookOpen, Heart, Map } from 'lucide-react';
import { getTranslation } from '@/lib/translations';
import { useI18n } from '@/lib/i18n-context';
import { ImageCarousel } from './ImageCarousel';

interface ActivityCardProps {
  name: string;
  descriptionEs: string;
  descriptionEn: string;
  category: 'cultural' | 'nature' | 'nearby' | 'family';
  link: string;
  linkType?: 'maps' | 'search';
  images?: string[];
}

export function ActivityCard({
  name,
  descriptionEs,
  descriptionEn,
  category,
  link,
  linkType = 'maps',
  images = [],
}: ActivityCardProps) {
  const { lang } = useI18n();

  const description = lang === 'es' ? descriptionEs : descriptionEn;

  const categoryIcons = {
    cultural: BookOpen,
    nature: Mountain,
    nearby: Map,
    family: Heart,
  };

  const Icon = categoryIcons[category] || ExternalLink;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow flex flex-col">
      {/* Image Carousel */}
      {images.length > 0 && (
        <div className="w-full">
          <ImageCarousel images={images} alt={name} className="h-48" />
        </div>
      )}
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start gap-3 mb-3">
          <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
          <h3 className="text-xl font-semibold text-text-primary">{name}</h3>
        </div>
        
        <p className="text-base text-text-secondary mb-4 flex-1">{description}</p>
        
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-primary border border-primary rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors self-start"
          aria-label={`${getTranslation(lang, 'learnMore')} - ${name}`}
        >
          {getTranslation(lang, 'learnMore')}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
