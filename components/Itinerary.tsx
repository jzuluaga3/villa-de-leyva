'use client';

import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Car, MapPin, Plane, Route, Clock, Users, Building } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { getTranslation } from '@/lib/translations';
import { cn } from '@/lib/utils';

interface RentalCarDetails {
  vehicle: string;
  company: string;
  location: string;
  transmission: string;
  mapsLink: string;
}

interface FlightDetails {
  airline: string;
  flightNumber: string;
  route: string;
  departure: string;
  arrival: string;
  aircraft: string;
  passengers?: string[];
}

interface Event {
  time: string;
  description: string;
  rentalCar?: RentalCarDetails;
  flight?: FlightDetails;
}

export function Itinerary() {
  const { lang } = useI18n();
  const [expandedRental, setExpandedRental] = useState<string | null>(null);
  const [expandedFlight, setExpandedFlight] = useState<string | null>(null);

  const rentalCarDetails: RentalCarDetails = {
    vehicle: 'Chevrolet Traverse',
    company: 'SIXT Rent a Car - Bogota Airport',
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
          time: '9:50 AM',
          description: lang === 'es' ? 'Vuelo de Llegada - Juan, Kelly, Cliff, Marcela' : 'Arrival Flight - Juan, Kelly, Cliff, Marcela',
          flight: {
            airline: 'Avianca',
            flightNumber: 'AV8451',
            route: 'MDE → BOG',
            departure: '09:50 AM',
            arrival: '10:45 AM',
            aircraft: 'Airbus A320',
            passengers: ['Juan', 'Kelly', 'Cliff', 'Marcela'],
          },
        },
        { 
          time: '12:00 PM', 
          description: getTranslation(lang, 'rentalCarPickup'),
          rentalCar: rentalCarDetails,
        },
        { time: '3:00 PM', description: lang === 'es' ? 'Check-in' : 'Check-in' },
        { time: '', description: lang === 'es' ? 'Abierto para Actividades' : 'Open for Activities' },
      ],
    },
    {
      date: lang === 'es' ? 'Miércoles, 31 de Diciembre, 2025' : 'Wednesday, December 31, 2025',
      subtitle: lang === 'es' ? '(Nochevieja)' : '(New Year\'s Eve)',
      events: [
        { time: '', description: lang === 'es' ? 'Abierto para Actividades' : 'Open for Activities' },
        { time: '8:00 PM', description: lang === 'es' ? 'Cena Familiar en la Casa' : 'Family Dinner at the House' },
        { time: '12:00 AM', description: lang === 'es' ? 'Celebración de Año Nuevo' : 'New Year\'s Celebration' },
      ],
    },
    {
      date: lang === 'es' ? 'Jueves, 1 de Enero, 2026' : 'Thursday, January 1, 2026',
      subtitle: lang === 'es' ? '(Día de Año Nuevo)' : '(New Year\'s Day)',
      events: [
        { time: '', description: lang === 'es' ? 'Abierto para Actividades' : 'Open for Activities' },
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
    {
      date: lang === 'es' ? 'Sábado, 3 de Enero, 2026' : 'Saturday, January 3, 2026',
      events: [
        {
          time: '12:40 AM',
          description: lang === 'es' ? 'Vuelo de Salida - Juan, Kelly' : 'Departure Flight - Juan, Kelly',
          flight: {
            airline: 'United Airlines',
            flightNumber: 'UA559',
            route: 'BOG → EWR',
            departure: '12:40 AM',
            arrival: '6:40 AM',
            aircraft: 'Boeing 737 Max 8',
            passengers: ['Juan', 'Kelly'],
          },
        },
        {
          time: '10:55 AM',
          description: lang === 'es' ? 'Vuelo de Conexión - Juan, Kelly' : 'Connecting Flight - Juan, Kelly',
          flight: {
            airline: 'United Airlines',
            flightNumber: 'UA4172',
            route: 'EWR → IAD',
            departure: '10:55 AM',
            arrival: '12:24 PM',
            aircraft: 'Bombardier CRJ550',
            passengers: ['Juan', 'Kelly'],
          },
        },
      ],
    },
  ];

  const toggleRentalCar = (eventId: string) => {
    setExpandedRental(expandedRental === eventId ? null : eventId);
  };

  const toggleFlight = (eventId: string) => {
    setExpandedFlight(expandedFlight === eventId ? null : eventId);
  };

  return (
    <section className="py-8 md:py-14 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center">
            {getTranslation(lang, 'itinerary')}
          </h2>
        </div>

        <div className="space-y-8">
          {itineraryItems.map((day, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 p-8 md:p-10 border border-gray-200/60"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary">{day.date}</h3>
                  {day.subtitle && (
                    <p className="text-sm text-text-secondary mt-1 font-medium">{day.subtitle}</p>
                  )}
                </div>
              </div>

              <div className="relative pl-6">
                {/* Events with bullets */}
                <div className="space-y-6 relative">
                  {day.events.map((event, eventIndex) => {
                    const eventId = `${index}-${eventIndex}`;
                    const isRentalExpanded = expandedRental === eventId;
                    const isFlightExpanded = expandedFlight === eventId;
                    const hasRentalCar = !!event.rentalCar;
                    const hasFlight = !!event.flight;
                    const isLastEvent = eventIndex === day.events.length - 1;
                    const isFirstEvent = eventIndex === 0;
                    
                    return (
                      <div 
                        key={eventIndex}
                        className="relative"
                      >
                        {/* Vertical dashed line segment - connects bullets */}
                        {day.events.length > 1 && !isLastEvent && (
                          <div 
                            className="absolute left-[10px] top-1/2 w-[1px] z-0" 
                            style={{ 
                              backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, #FF5A5F 4px, #FF5A5F 8px)',
                              backgroundSize: '1px 8px',
                              transform: 'translateX(-50%)',
                              height: 'calc(100% + 1.5rem)',
                            }} 
                          />
                        )}
                        <div className="flex items-center gap-4 min-h-[1.625rem]">
                          {/* Bullet point - aligned with center of text line */}
                          <div className="absolute left-[10px] top-1/2 z-20 flex-shrink-0" style={{ transform: 'translateX(-50%) translateY(-50%)' }}>
                            <div className="w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-white shadow-sm" />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 ml-6 md:ml-6 min-w-0">
                            <div className="flex flex-row items-center gap-2 sm:gap-3 flex-nowrap">
                              {event.time && (
                                <span className="font-semibold text-text-primary text-base tracking-wide whitespace-nowrap leading-relaxed flex-shrink-0">
                                  {event.time}
                                </span>
                              )}
                              <div className="flex-1 min-w-0">
                                {hasRentalCar ? (
                                  <button
                                    onClick={() => toggleRentalCar(eventId)}
                                    className="flex items-center gap-2 text-text-primary text-base leading-relaxed hover:text-primary transition-colors w-full text-left group"
                                  >
                                    <Car className="w-4 h-4 flex-shrink-0" />
                                    <span className="font-medium break-words min-w-0 flex-1 leading-relaxed text-base">{event.description}</span>
                                    <span className="flex-shrink-0">
                                      {isRentalExpanded ? (
                                        <ChevronUp className="w-4 h-4" />
                                      ) : (
                                        <ChevronDown className="w-4 h-4" />
                                      )}
                                    </span>
                                  </button>
                                ) : hasFlight ? (
                                  <button
                                    onClick={() => toggleFlight(eventId)}
                                    className="flex items-center gap-2 text-text-primary text-base leading-relaxed hover:text-primary transition-colors w-full text-left group"
                                  >
                                    <Plane className="w-4 h-4 flex-shrink-0" />
                                    <span className="font-medium break-words min-w-0 flex-1 leading-relaxed text-base">{event.description}</span>
                                    <span className="flex-shrink-0">
                                      {isFlightExpanded ? (
                                        <ChevronUp className="w-4 h-4" />
                                      ) : (
                                        <ChevronDown className="w-4 h-4" />
                                      )}
                                    </span>
                                  </button>
                                ) : (
                                  <span className="text-text-primary text-base leading-relaxed break-words font-medium">
                                    {event.description}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Flight Details */}
                            {hasFlight && isFlightExpanded && event.flight && (
                              <div className="mt-5 p-5 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                                <div className="space-y-3">
                                  <div className="flex items-start gap-3">
                                    <Plane className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wide">
                                        {lang === 'es' ? 'Aerolínea' : 'Airline'}
                                      </p>
                                      <p className="text-sm text-text-primary leading-relaxed break-words">{event.flight.airline} {event.flight.flightNumber}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-3">
                                    <Route className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wide">
                                        {lang === 'es' ? 'Ruta' : 'Route'}
                                      </p>
                                      <p className="text-sm text-text-primary leading-relaxed break-words">{event.flight.route}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                      <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wide">
                                          {lang === 'es' ? 'Salida' : 'Departure'}
                                        </p>
                                        <p className="text-sm text-text-primary leading-relaxed break-words">{event.flight.departure}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                      <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wide">
                                          {lang === 'es' ? 'Llegada' : 'Arrival'}
                                        </p>
                                        <p className="text-sm text-text-primary leading-relaxed break-words">{event.flight.arrival}</p>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-3">
                                    <Plane className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wide">
                                        {lang === 'es' ? 'Aeronave' : 'Aircraft'}
                                      </p>
                                      <p className="text-sm text-text-primary leading-relaxed break-words">{event.flight.aircraft}</p>
                                    </div>
                                  </div>
                                  
                                  {event.flight.passengers && event.flight.passengers.length > 0 && (
                                    <div className="flex items-start gap-3">
                                      <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wide">
                                          {lang === 'es' ? 'Pasajeros' : 'Passengers'}
                                        </p>
                                        <p className="text-sm text-text-primary leading-relaxed break-words">{event.flight.passengers.join(', ')}</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            {/* Expandable Rental Car Details */}
                            {hasRentalCar && isRentalExpanded && event.rentalCar && (
                              <div className="mt-5 p-5 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                                <div className="space-y-3">
                                  <div className="flex items-start gap-3">
                                    <Building className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wide">
                                        {lang === 'es' ? 'Empresa' : 'Company'}
                                      </p>
                                      <p className="text-sm text-text-primary leading-relaxed break-words">{event.rentalCar.company}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-3">
                                    <Car className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wide">
                                        {getTranslation(lang, 'vehicle')}
                                      </p>
                                      <p className="text-sm text-text-primary leading-relaxed break-words">{event.rentalCar.vehicle}</p>
                                      <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                                        {getTranslation(lang, 'transmission')}: {event.rentalCar.transmission}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wide">
                                        {getTranslation(lang, 'location')}
                                      </p>
                                      <p className="text-sm text-text-primary leading-relaxed break-words">{event.rentalCar.location}</p>
                                    </div>
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