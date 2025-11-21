'use client';

import { Calendar } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { getTranslation } from '@/lib/translations';

export function Itinerary() {
  const { lang } = useI18n();

  const itineraryItems = [
    {
      date: lang === 'es' ? 'Martes, 30 de Diciembre, 2025' : 'Tuesday, December 30, 2025',
      events: [
        { time: '3:00 PM', description: lang === 'es' ? 'Check-in' : 'Check-in' },
      ],
    },
    {
      date: lang === 'es' ? 'Miércoles, 31 de Diciembre, 2025' : 'Wednesday, December 31, 2025',
      subtitle: lang === 'es' ? '(Nochevieja)' : '(New Year\'s Eve)',
      events: [
        { time: '8:00 PM', description: lang === 'es' ? 'Cena Familiar en la Casa' : 'Family Dinner at the House' },
        { time: '12:00 AM', description: lang === 'es' ? 'Celebración de Año Nuevo' : 'New Year\'s Celebration' },
      ],
    },
    {
      date: lang === 'es' ? 'Jueves, 1 de Enero, 2026' : 'Thursday, January 1, 2026',
      subtitle: lang === 'es' ? '(Día de Año Nuevo)' : '(New Year\'s Day)',
      events: [
        { time: '', description: lang === 'es' ? 'Abierto para actividades' : 'Open for activities' },
      ],
    },
    {
      date: lang === 'es' ? 'Viernes, 2 de Enero, 2026' : 'Friday, January 2, 2026',
      events: [
        { time: '12:00 PM', description: lang === 'es' ? 'Check-out' : 'Check-out' },
      ],
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-text-primary text-center">
            {getTranslation(lang, 'itinerary')}
          </h2>
        </div>

        <div className="space-y-6">
          {itineraryItems.map((day, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{day.date}</h3>
                  {day.subtitle && (
                    <p className="text-sm text-text-secondary">{day.subtitle}</p>
                  )}
                </div>
              </div>

              <ul className="space-y-2 ml-8">
                {day.events.map((event, eventIndex) => (
                  <li key={eventIndex} className="flex gap-3">
                    {event.time && (
                      <span className="font-medium text-text-primary min-w-[80px]">
                        {event.time}
                      </span>
                    )}
                    <span className="text-text-primary">- {event.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}