'use client';

import { useState } from 'react';
import { MapPin, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { getTranslation } from '@/lib/translations';

export function TripInfo() {
  const { lang } = useI18n();
  const [expandedArrivalDeparture, setExpandedArrivalDeparture] = useState(false);

  const toggleArrivalDeparture = () => {
    setExpandedArrivalDeparture(!expandedArrivalDeparture);
  };

  return (
    <div className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 p-8 md:p-10 border border-gray-200/60 h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/10 rounded-lg">
          <MapPin className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
          {getTranslation(lang, 'tripInfo')}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="pb-4 border-b border-gray-100">
          <p className="text-xs uppercase tracking-wider font-semibold text-text-secondary mb-2">
            {getTranslation(lang, 'address')}
          </p>
          <p className="text-lg text-text-primary font-medium mb-3">Villa de Leyva, Boyacá, Colombia</p>
          <a
            href="https://www.google.com/maps?q=5.654089,-73.507927"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            aria-label={getTranslation(lang, 'getDirections')}
          >
            <MapPin className="w-4 h-4" />
            {getTranslation(lang, 'getDirections')}
          </a>
        </div>

        <div className="pt-2">
          <button
            onClick={toggleArrivalDeparture}
            className="flex items-center gap-3 text-text-primary text-base leading-relaxed hover:text-primary transition-all duration-200 w-full text-left mb-4 group"
          >
            <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">
              {lang === 'es' ? 'Llegada / Salida' : 'Arrival / Departure'}
            </span>
            {expandedArrivalDeparture ? (
              <ChevronUp className="w-4 h-4 ml-auto group-hover:scale-110 transition-transform" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-auto group-hover:scale-110 transition-transform" />
            )}
          </button>

          {expandedArrivalDeparture && (
            <div className="mt-4 p-5 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200/60 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-text-secondary mb-1">
                    {getTranslation(lang, 'checkIn')}
                  </p>
                  <p className="text-sm text-text-primary">
                    {lang === 'es' 
                      ? 'Martes, 30 de Diciembre, 2025 a las 3:00 PM'
                      : 'Tuesday, December 30, 2025 at 3:00 PM'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-text-secondary mb-1">
                    {getTranslation(lang, 'checkOut')}
                  </p>
                  <p className="text-sm text-text-primary">
                    {lang === 'es' 
                      ? 'Viernes, 2 de Enero, 2026 a las 12:00 PM'
                      : 'Friday, January 2, 2026 at 12:00 PM'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}