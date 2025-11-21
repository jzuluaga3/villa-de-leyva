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
    <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 h-full">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold text-text-primary">
          {getTranslation(lang, 'tripInfo')}
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-text-secondary mb-1">
            {getTranslation(lang, 'address')}
          </p>
          <p className="text-base text-text-primary">Villa de Leyva, Boyacá, Colombia</p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={toggleArrivalDeparture}
            className="flex items-center gap-2 text-text-primary text-base leading-relaxed hover:text-primary transition-colors w-full text-left mb-4"
          >
            <Calendar className="w-5 h-5" />
            <span className="font-semibold">
              {lang === 'es' ? 'Llegada / Salida' : 'Arrival / Departure'}
            </span>
            {expandedArrivalDeparture ? (
              <ChevronUp className="w-4 h-4 ml-auto" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-auto" />
            )}
          </button>

          {expandedArrivalDeparture && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
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