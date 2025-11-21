'use client';

import { MapPin, Calendar, Clock } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { getTranslation } from '@/lib/translations';

export function TripInfo() {
  const { lang } = useI18n();

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
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
              <div className="flex items-start gap-3 mb-4">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-1">
                    {getTranslation(lang, 'checkIn')}
                  </p>
                  <p className="text-base text-text-primary">
                    {lang === 'es' 
                      ? 'Martes, 30 de Diciembre, 2025 a las 3:00 PM'
                      : 'Tuesday, December 30, 2025 at 3:00 PM'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-1">
                    {getTranslation(lang, 'checkOut')}
                  </p>
                  <p className="text-base text-text-primary">
                    {lang === 'es' 
                      ? 'Viernes, 2 de Enero, 2026 a las 12:00 PM'
                      : 'Friday, January 2, 2026 at 12:00 PM'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}