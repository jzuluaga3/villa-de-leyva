'use client';

import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Car, MapPin } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { getTranslation } from '@/lib/translations';
import { cn } from '@/lib/utils';

interface RentalCarDetails {
  vehicle: string;
  reservationNumber: string;
  location: string;
  transmission: string;
  mapsLink: string;
}

interface Event {
  time: string;
  description: string;
  rentalCar?: RentalCarDetails;
}

export function Itinerary() {
  const { lang } = useI18n();
  const [expandedRental, setExpandedRental] = useState<string | null>(null);

  const rentalCarDetails: RentalCarDetails = {
    vehicle: 'Chevrolet Traverse',
    reservationNumber: '9725898206',
    location: lang === 'es' 
      ? 'Bogotá El Dorado Aeropuerto' 
      : 'Bogotá El Dorado Airport',
    transmission: lang === 'es' ? 'Automático' : 'Automatic',
    mapsLink: 'https://maps.app.goo.gl/XX5tFHgry8sW67sc9',
  };

  const itineraryItems: Array<{ date: string; subtitle?: string; events: Event[] }> = [
    {
      date: lang === 'es' ? 'Martes, 30 de Diciembre, 2025' : 'Tuesday, December 30, 2025',
      events: [
        { 
          time: '12:00 PM', 
          description: getTranslation(lang, 'rentalCarPickup'),
          rentalCar: rentalCarDetails,
        },
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
        { 
          time: '12:00 PM', 
          description: getTranslation(lang, 'rentalCarDropoff'),
          rentalCar: rentalCarDetails,
        },
        { time: '12:00 PM', description: lang === 'es' ? 'Check-out' : 'Check-out' },
      ],
    },
  ];

  const toggleRentalCar = (eventId: string) => {
    setExpandedRental(expandedRental === eventId ? null : eventId);
  };

  return (
    <section className="pt-8 pb-8 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-text-primary text-center">
            {getTranslation(lang, 'itinerary')}
          </h2>
        </div>

        <div className="space-y-8">
          {itineraryItems.map((day, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-8 border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{day.date}</h3>
                  {day.subtitle && (
                    <p className="text-sm text-text-secondary mt-1">{day.subtitle}</p>
                  )}
                </div>
              </div>

              <div className="relative pl-6">
                {/* Events with bullets */}
                <div className="space-y-5 relative">
                  {/* Vertical dashed line - connects through bullet centers */}
                  {day.events.length > 1 && (
                    <div 
                      className="absolute left-[10px] top-[9px] bottom-[9px] w-[1px] z-0" 
                      style={{ 
                        backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, #FF5A5F 4px, #FF5A5F 8px)',
                        backgroundSize: '1px 8px',
                        transform: 'translateX(-50%)',
                      }} 
                    />
                  )}
                  {day.events.map((event, eventIndex) => {
                    const eventId = `${index}-${eventIndex}`;
                    const isExpanded = expandedRental === eventId;
                    const hasRentalCar = !!event.rentalCar;
                    
                    return (
                      <div key={eventIndex} className="relative">
                        <div className="flex items-start gap-4">
                          {/* Bullet point - centered on line */}
                          <div className="absolute left-[10px] top-1.5 z-10 flex-shrink-0" style={{ transform: 'translateX(-50%)' }}>
                            <div className="w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-white shadow-sm" />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 ml-4 md:ml-6">
                            <div className="flex items-baseline gap-3 flex-wrap">
                              {event.time && (
                                <span className="font-semibold text-text-primary text-sm tracking-wide">
                                  {event.time}
                                </span>
                              )}
                              {hasRentalCar ? (
                                <button
                                  onClick={() => toggleRentalCar(eventId)}
                                  className="flex items-center gap-2 text-text-primary text-base leading-relaxed hover:text-primary transition-colors"
                                >
                                  <Car className="w-4 h-4" />
                                  <span className="font-semibold">{event.description}</span>
                                  {isExpanded ? (
                                    <ChevronUp className="w-4 h-4" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )}
                                </button>
                              ) : (
                                <span className="text-text-primary text-base leading-relaxed">
                                  {event.description}
                                </span>
                              )}
                            </div>
                            
                            {/* Expandable Rental Car Details */}
                            {hasRentalCar && isExpanded && event.rentalCar && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                                <div className="space-y-2">
                                  <div className="flex items-start gap-2">
                                    <Car className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                      <p className="text-xs font-medium text-text-secondary mb-1">
                                        {getTranslation(lang, 'vehicle')}
                                      </p>
                                      <p className="text-sm text-text-primary">{event.rentalCar.vehicle}</p>
                                      <p className="text-xs text-text-secondary mt-1">
                                        {getTranslation(lang, 'transmission')}: {event.rentalCar.transmission}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                      <p className="text-xs font-medium text-text-secondary mb-1">
                                        {getTranslation(lang, 'location')}
                                      </p>
                                      <p className="text-sm text-text-primary">{event.rentalCar.location}</p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <p className="text-xs font-medium text-text-secondary mb-1">
                                      {getTranslation(lang, 'reservationNumber')}
                                    </p>
                                    <p className="text-sm text-text-primary font-mono">{event.rentalCar.reservationNumber}</p>
                                  </div>
                                </div>
                                
                                <a
                                  href={event.rentalCar.mapsLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                                >
                                  <MapPin className="w-4 h-4" />
                                  {getTranslation(lang, 'getDirections')}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}