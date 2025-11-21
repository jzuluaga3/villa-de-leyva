'use client';

import { MapPin, ExternalLink } from 'lucide-react';
import { getTranslation } from '@/lib/translations';
import { useI18n } from '@/lib/i18n-context';

interface RestaurantCardProps {
  name: string;
  descriptionEs: string;
  descriptionEn: string;
  googleMapsQuery: string;
}

export function RestaurantCard({
  name,
  descriptionEs,
  descriptionEn,
  googleMapsQuery,
}: RestaurantCardProps) {
  const { lang } = useI18n();

  const description = lang === 'es' ? descriptionEs : descriptionEn;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(googleMapsQuery)}`;
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(googleMapsQuery)}`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-text-primary mb-3">{name}</h3>
      <p className="text-base text-text-secondary mb-4">{description}</p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          aria-label={`${getTranslation(lang, 'viewOnMaps')} - ${name}`}
        >
          <MapPin className="w-4 h-4" />
          {getTranslation(lang, 'viewOnMaps')}
        </a>
        
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-primary border border-primary rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors"
          aria-label={`${getTranslation(lang, 'learnMore')} - ${name}`}
        >
          {getTranslation(lang, 'learnMore')}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
