'use client';

import { useState, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronUp, Car, MapPin, Plane, Route, Clock, Users, Building, Navigation, Home, UtensilsCrossed, Sparkles } from 'lucide-react';
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

interface LocationOption {
  name: string;
  mapsLink: string;
}

interface Event {
  time: string;
  description: string;
  participants?: string;
  rentalCar?: RentalCarDetails;
  flight?: FlightDetails;
  mapsLink?: string;
  locationOptions?: LocationOption[];
}

export function Itinerary() {
  const { lang } = useI18n();
  const [expandedRental, setExpandedRental] = useState<string | null>(null);
  const [expandedFlight, setExpandedFlight] = useState<string | null>(null);
  
  // Parse date string to Date object for comparison
  const parseDate = (dateString: string): Date | null => {
    // Handle Spanish format: "Martes, 30 de Diciembre, 2025"
    // Handle English format: "Tuesday, December 30, 2025"
    const monthsEs: { [key: string]: string } = {
      'enero': 'January', 'febrero': 'February', 'marzo': 'March',
      'abril': 'April', 'mayo': 'May', 'junio': 'June',
      'julio': 'July', 'agosto': 'August', 'septiembre': 'September',
      'octubre': 'October', 'noviembre': 'November', 'diciembre': 'December'
    };
    
    try {
      // Try Spanish format first: "30 de Diciembre, 2025" or "30 de Diciembre 2025"
      let match = dateString.match(/(\d{1,2})\s+de\s+(\w+)[,\s]+(\d{4})/i);
      if (match) {
        const day = parseInt(match[1], 10);
        const monthNameEs = match[2].toLowerCase();
        const year = parseInt(match[3], 10);
        const monthName = monthsEs[monthNameEs] || monthNameEs;
        const dateStr = `${monthName} ${day}, ${year}`;
        return new Date(dateStr);
      }
      
      // Try English format: "December 30, 2025"
      match = dateString.match(/(\w+)\s+(\d{1,2}),\s+(\d{4})/i);
      if (match) {
        const monthName = match[1];
        const day = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);
        const dateStr = `${monthName} ${day}, ${year}`;
        return new Date(dateStr);
      }
    } catch (e) {
      console.error('Error parsing date:', e);
    }
    return null;
  };
  
  // Check if a day has passed (before today)
  const hasDayPassed = (dateString: string): boolean => {
    const dayDate = parseDate(dateString);
    if (!dayDate) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dayDate.setHours(0, 0, 0, 0);
    
    return dayDate < today;
  };
  
  const rentalCarDetails: RentalCarDetails = {
    vehicle: 'Renault Stepway',
    company: 'Rent a Car Andina',
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
          time: '7:45 AM',
          description: lang === 'es' ? 'Salida hacia el Aeropuerto' : 'Departure to Airport',
          participants: lang === 'es' ? 'Juan David, Kelly, Cliff y Marcela' : 'Juan David, Kelly, Cliff, Marcela',
        },
        {
          time: '9:50 AM',
          description: lang === 'es' ? 'Vuelo de Llegada' : 'Arrival Flight',
          participants: lang === 'es' ? 'Juan David, Kelly, Cliff y Marcela' : 'Juan David, Kelly, Cliff, Marcela',
          flight: {
            airline: 'Avianca',
            flightNumber: 'AV8451',
            route: 'MDE → BOG',
            departure: '09:50 AM',
            arrival: '10:45 AM',
            aircraft: 'Airbus A320',
            passengers: ['Juan David', 'Kelly', 'Cliff', 'Marcela'],
          },
        },
        { 
          time: '11:00 AM', 
          description: getTranslation(lang, 'rentalCarPickup'),
          rentalCar: rentalCarDetails,
        },
        {
          time: '1:00 PM',
          description: lang === 'es' ? 'Almuerzo: El Tambor (Cajicá)' : 'Lunch: El Tambor (Cajicá)',
          participants: lang === 'es' ? 'Almuerzo al aire libre.' : 'Outdoor lunch.',
          mapsLink: 'https://www.google.com/maps/search/?api=1&query=El+Tambor+Cajicá',
        },
        {
          time: '3:15 PM',
          description: lang === 'es' ? 'Foto en el Sisga' : 'Photo at Sisga',
          participants: lang === 'es' ? 'Parada para estirar piernas y foto en la represa.' : 'Stop to stretch legs and photo at the dam.',
          mapsLink: 'https://www.google.com/maps/search/?api=1&query=Represa+del+Sisga',
        },
        {
          time: '4:15 PM',
          description: lang === 'es' ? 'Ventaquemada (Arepas)' : 'Ventaquemada (Arepas)',
          participants: lang === 'es' ? 'Paramos 10 minutos a comprar arepas de choclo y queso para el camino.' : '10 minute stop to buy corn and cheese arepas for the road.',
          locationOptions: [
            {
              name: 'Parador El Buen Gusto',
              mapsLink: 'https://maps.app.goo.gl/T3NVTVXC2JWfLzAK6',
            },
            {
              name: 'Restaurante Puerto Boyacense',
              mapsLink: 'https://maps.app.goo.gl/gxkHeD6ztaDQkDXm7',
            },
          ],
        },
        {
          time: '5:30 PM',
          description: lang === 'es' ? 'Puente de Boyacá' : 'Puente de Boyacá',
          participants: lang === 'es' ? 'Llegamos justo antes de que prendan las luces (6:00 PM) para ver el alumbrado.' : 'Arrive just before lights turn on (6:00 PM) to see the lighting.',
          mapsLink: 'https://www.google.com/maps/search/?api=1&query=Puente+de+Boyacá',
        },
        {
          time: '6:45 PM',
          description: lang === 'es' ? 'Salida a Villa de Leyva' : 'Departure to Villa de Leyva',
        },
        {
          time: '8:00 PM',
          description: lang === 'es' ? 'Villa de Leyva' : 'Villa de Leyva',
          participants: lang === 'es' ? 'Llegada a descansar. 🏡' : 'Arrival to rest. 🏡',
        },
        { time: '8:00 PM', description: lang === 'es' ? 'Check-in' : 'Check-in' },
      ],
    },
    {
      date: lang === 'es' ? 'Miércoles, 31 de Diciembre, 2025' : 'Wednesday, December 31, 2025',
      subtitle: lang === 'es' ? '(Ráquira & Longaniza)' : '(Ráquira & Longaniza)',
      events: [
        {
          time: '9:00 AM',
          description: lang === 'es' ? 'Salimos a Ráquira' : 'Departure to Ráquira',
          mapsLink: 'https://www.google.com/maps/search/?api=1&query=Ráquira+Boyacá',
        },
        {
          time: '12:30 PM',
          description: lang === 'es' ? 'Almuerzo en Sutamarchán' : 'Lunch in Sutamarchán',
          locationOptions: [
            {
              name: 'La Fogita',
              mapsLink: 'https://www.google.com/maps/search/?api=1&query=La+Fogita+Sutamarchán',
            },
            {
              name: 'Don Jorge',
              mapsLink: 'https://www.google.com/maps/search/?api=1&query=Don+Jorge+Sutamarchán',
            },
          ],
        },
        {
          time: '3:00 PM',
          description: lang === 'es' 
            ? 'Regreso a Villa de Leyva. Tarde suave: Museo del Chocolate, caminar la Plaza, iglesia y prepararnos para la noche de Año Nuevo'
            : "Return to Villa de Leyva. Relaxing afternoon: Chocolate Museum, walk the Plaza, church and prepare for New Year's Eve",
          participants: lang === 'es' 
            ? 'Museo del Chocolate, caminar la Plaza Mayor, iglesia'
            : 'Chocolate Museum, walk the Main Plaza, church',
        },
        { 
          time: '8:00 PM', 
          description: lang === 'es' ? 'Cena Familiar en la Casa' : 'Family Dinner at the House',
          participants: lang === 'es' 
            ? 'Plato Principal: Paella de Mariscos. Ingredientes: Camarón, Anillos de Calamar, Almeja Concha Blanca, Mejillones Negros, Filete de Robalo Fresco, Arroz Dona Pepa'
            : 'Main Dish: Seafood Paella. Ingredients: Shrimp, Squid Rings, White Clam, Black Mussels, Fresh Snapper Fillet, Dona Pepa Rice',
        },
        { time: '12:00 AM', description: lang === 'es' ? 'Celebración de Año Nuevo' : "New Year's Celebration" },
      ],
    },
    {
      date: lang === 'es' ? 'Jueves, 1 de Enero, 2026' : 'Thursday, January 1, 2026',
      subtitle: lang === 'es' ? '(Aventura & Pueblitos)' : '(Adventure & Small Towns)',
      events: [
        {
          time: '10:00 AM',
          description: lang === 'es' ? 'Plan Dividido' : 'Split Plan',
          participants: lang === 'es'
            ? 'Jóvenes: Cuatrimotos (Desierto + Pozos Azules) | Tranqui: Viñedo Ain Karim (Cata de vinos y paisaje) o Casa Terracota'
            : 'Young: ATVs (Desert + Blue Pools) | Relaxed: Ain Karim Vineyard (Wine tasting and scenery) or Casa Terracota',
          locationOptions: [
            {
              name: lang === 'es' ? 'Cuatrimotos - Desierto' : 'ATVs - Desert',
              mapsLink: 'https://www.google.com/maps/search/?api=1&query=Desierto+de+la+Candelaria+Villa+de+Leyva',
            },
            {
              name: lang === 'es' ? 'Pozos Azules' : 'Blue Pools',
              mapsLink: 'https://www.google.com/maps/search/?api=1&query=Pozos+Azules+Villa+de+Leyva',
            },
            {
              name: 'Viñedo Ain Karim',
              mapsLink: 'https://www.google.com/maps/search/?api=1&query=Viñedo+Ain+Karim+Villa+de+Leyva',
            },
            {
              name: 'Casa Terracota',
              mapsLink: 'https://www.google.com/maps/search/?api=1&query=Casa+Terracota+Villa+de+Leyva',
            },
          ],
        },
        {
          time: '1:30 PM',
          description: lang === 'es' ? 'Almuerzo todos juntos' : 'Lunch all together',
        },
        {
          time: '3:00 PM',
          description: lang === 'es' ? 'Opción Pueblito' : 'Small Town Option',
          participants: lang === 'es'
            ? 'Opción A: Pueblito Boyacense en Duitama (~1h 20m de viaje) | Opción B (Relax): Quedarnos en la Plaza Mayor y descansando. Decidimos ese día basado en cómo todos se sienten.'
            : 'Option A: Pueblito Boyacense in Duitama (~1h 20m drive) | Option B (Relax): Stay at the Main Plaza and rest. We decide that day based on how everyone feels.',
          locationOptions: [
            {
              name: lang === 'es' ? 'Pueblito Boyacense - Duitama' : 'Pueblito Boyacense - Duitama',
              mapsLink: 'https://www.google.com/maps/search/?api=1&query=Pueblito+Boyacense+Duitama',
            },
            {
              name: lang === 'es' ? 'Plaza Mayor - Villa de Leyva' : 'Main Plaza - Villa de Leyva',
              mapsLink: 'https://www.google.com/maps/search/?api=1&query=Plaza+Mayor+Villa+de+Leyva',
            },
          ],
        },
      ],
    },
    {
      date: lang === 'es' ? 'Viernes, 2 de Enero, 2026' : 'Friday, January 2, 2026',
      events: [
        {
          time: '6:00 AM',
          description: lang === 'es' ? 'Salida para Regresar a Bogotá' : 'Leave to Return to Bogota',
        },
        { 
          time: '11:00 AM', 
          description: getTranslation(lang, 'rentalCarDropoff'),
          rentalCar: rentalCarDetails,
        },
        { time: '11:00 AM', description: lang === 'es' ? 'Check-out' : 'Check-out' },
      ],
    },
    {
      date: lang === 'es' ? 'Sábado, 3 de Enero, 2026' : 'Saturday, January 3, 2026',
      events: [
        {
          time: '12:40 AM',
          description: lang === 'es' ? 'Vuelo de Salida' : 'Departure Flight',
          participants: lang === 'es' ? 'Juan David y Kelly' : 'Juan David, Kelly',
          flight: {
            airline: 'United Airlines',
            flightNumber: 'UA559',
            route: 'BOG → EWR',
            departure: '12:40 AM',
            arrival: '6:40 AM',
            aircraft: 'Boeing 737 Max 8',
            passengers: ['Juan David', 'Kelly'],
          },
        },
        {
          time: '10:55 AM',
          description: lang === 'es' ? 'Vuelo de Conexión' : 'Connecting Flight',
          participants: lang === 'es' ? 'Juan David y Kelly' : 'Juan David, Kelly',
          flight: {
            airline: 'United Airlines',
            flightNumber: 'UA4172',
            route: 'EWR → IAD',
            departure: '10:55 AM',
            arrival: '12:24 PM',
            aircraft: 'Bombardier CRJ550',
            passengers: ['Juan David', 'Kelly'],
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

  const getActivityIcon = (event: Event) => {
    // If it has flight or rental car, those are handled separately
    if (event.flight) return null; // Flight icon is shown in button
    if (event.rentalCar) return null; // Car icon is shown in button
    
    const desc = event.description.toLowerCase();
    const descEs = lang === 'es' ? desc : '';
    
    // Airport departure
    if (desc.includes('departure to airport') || desc.includes('salida hacia el aeropuerto') || desc.includes('salida hacia')) {
      return Navigation;
    }
    
    // Check-in / Check-out
    if (desc.includes('check-in') || desc.includes('check-out') || desc.includes('checkin') || desc.includes('checkout')) {
      return Home;
    }
    
    // Lunch / Almuerzo
    if (desc.includes('lunch') || desc.includes('almuerzo')) {
      return UtensilsCrossed;
    }
    
    // Dinner / Cena
    if (desc.includes('dinner') || desc.includes('cena')) {
      return UtensilsCrossed;
    }
    
    // New Year / Año Nuevo
    if (desc.includes('new year') || desc.includes('año nuevo') || desc.includes('celebración')) {
      return Sparkles;
    }
    
    // Default icon for other timed activities
    if (event.time) {
      return Clock;
    }
    
    return null;
  };
  
  // Initialize collapsed state for past days
  const [collapsedDays, setCollapsedDays] = useState<Set<number>>(new Set());
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    if (!initialized) {
      const collapsed = new Set<number>();
      itineraryItems.forEach((day, index) => {
        if (hasDayPassed(day.date)) {
          collapsed.add(index);
        }
      });
      setCollapsedDays(collapsed);
      setInitialized(true);
    }
  }, [lang, itineraryItems, initialized]); // Only initialize once
  
  const toggleDay = (index: number) => {
    setCollapsedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
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
              className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 p-4 md:p-10 border border-gray-200/60"
            >
              <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
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
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDay(index);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-gray-50 cursor-pointer"
                  aria-label={collapsedDays.has(index) ? (lang === 'es' ? 'Expandir' : 'Expand') : (lang === 'es' ? 'Colapsar' : 'Collapse')}
                  type="button"
                >
                  {collapsedDays.has(index) ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronUp className="w-5 h-5" />
                  )}
                </button>
              </div>

              {!collapsedDays.has(index) && (
                <div className="relative pl-3 md:pl-6">
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
                        {/* Bullet point - aligned with center of first line (time/activity) */}
                        <div className="absolute left-[6px] md:left-[10px] top-[0.8125rem] z-20 flex-shrink-0" style={{ transform: 'translateX(-50%) translateY(-50%)' }}>
                          <div className="w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-white shadow-sm" />
                        </div>
                        
                        {/* Vertical dashed line segment - extends from bullet center to next event's bullet center */}
                        {day.events.length > 1 && !isLastEvent && (
                          <div 
                            className="absolute left-[6px] md:left-[10px] w-[1px] z-0" 
                            style={{ 
                              top: '0.8125rem',
                              backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, #FF5A5F 4px, #FF5A5F 8px)',
                              backgroundSize: '1px 8px',
                              transform: 'translateX(-50%)',
                              height: 'calc(100% + 1.5rem)',
                            }} 
                          />
                        )}
                        
                        {/* Content wrapper - contains time, activity, and expanded content */}
                        <div className="ml-4 md:ml-6 min-w-0">
                          {/* First line: time and activity name - fixed height container for alignment */}
                          <div className="flex flex-row items-start gap-2 sm:gap-3 flex-nowrap min-h-[1.625rem]">
                            {event.time && (
                              <span className="font-semibold text-text-primary text-base tracking-wide whitespace-nowrap leading-relaxed flex-shrink-0 pt-0.5">
                                {event.time}
                              </span>
                            )}
                            <div className="flex-1 min-w-0">
                              {hasRentalCar ? (
                                <button
                                  onClick={() => toggleRentalCar(eventId)}
                                  className="flex flex-col w-full text-left group hover:text-primary transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <Car className="w-4 h-4 flex-shrink-0 text-text-primary group-hover:text-primary transition-colors" />
                                    <span className="font-medium break-words min-w-0 flex-1 leading-relaxed text-base text-text-primary group-hover:text-primary transition-colors">{event.description}</span>
                                    <span className="flex-shrink-0 text-text-primary group-hover:text-primary transition-colors">
                                      {isRentalExpanded ? (
                                        <ChevronUp className="w-4 h-4" />
                                      ) : (
                                        <ChevronDown className="w-4 h-4" />
                                      )}
                                    </span>
                                  </div>
                                  {event.participants && (
                                    <p className="text-sm text-text-secondary mt-1 ml-6 leading-relaxed group-hover:text-primary transition-colors">
                                      {event.participants}
                                    </p>
                                  )}
                                </button>
                              ) : hasFlight ? (
                                <button
                                  onClick={() => toggleFlight(eventId)}
                                  className="flex flex-col w-full text-left group hover:text-primary transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <Plane className="w-4 h-4 flex-shrink-0 text-text-primary group-hover:text-primary transition-colors" />
                                    <span className="font-medium break-words min-w-0 flex-1 leading-relaxed text-base text-text-primary group-hover:text-primary transition-colors">{event.description}</span>
                                    <span className="flex-shrink-0 text-text-primary group-hover:text-primary transition-colors">
                                      {isFlightExpanded ? (
                                        <ChevronUp className="w-4 h-4" />
                                      ) : (
                                        <ChevronDown className="w-4 h-4" />
                                      )}
                                    </span>
                                  </div>
                                  {event.participants && (
                                    <p className="text-sm text-text-secondary mt-1 ml-6 leading-relaxed group-hover:text-primary transition-colors">
                                      {event.participants}
                                    </p>
                                  )}
                                </button>
                              ) : (
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-2">
                                    {(() => {
                                      const ActivityIcon = getActivityIcon(event);
                                      return (
                                        <span className="flex items-center gap-2 text-text-primary text-base leading-relaxed break-words font-medium">
                                          {ActivityIcon && <ActivityIcon className="w-4 h-4 flex-shrink-0" />}
                                          <span>{event.description}</span>
                                        </span>
                                      );
                                    })()}
                                  </div>
                                  {event.participants && (
                                    <p className="text-sm text-text-secondary mt-1 ml-6 leading-relaxed">
                                      {event.participants}
                                    </p>
                                  )}
                                  {event.locationOptions && event.locationOptions.length > 0 && (
                                    <div className="mt-2 ml-6 space-y-4 flex flex-col">
                                      {event.locationOptions.map((option, optionIndex) => (
                                        <a
                                          key={optionIndex}
                                          href={option.mapsLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors w-fit"
                                        >
                                          <MapPin className="w-3 h-3" />
                                          {option.name}
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                  {event.mapsLink && !event.locationOptions && (
                                    <a
                                      href={event.mapsLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors mt-2 ml-6 self-start"
                                    >
                                      <MapPin className="w-3 h-3" />
                                      {getTranslation(lang, 'getDirections')}
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Expanded content appears below without affecting bullet position */}
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
                                        <p className="text-sm text-text-primary leading-relaxed break-words">
                                          {lang === 'es' 
                                            ? event.flight.passengers.length === 2 
                                              ? event.flight.passengers.join(' y ')
                                              : event.flight.passengers.slice(0, -1).join(', ') + ' y ' + event.flight.passengers[event.flight.passengers.length - 1]
                                            : event.flight.passengers.join(', ')
                                          }
                                        </p>
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
                    );
                  })}
                </div>
              </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}