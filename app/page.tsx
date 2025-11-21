'use client';

import { Hero } from '@/components/Hero';
import { TripInfo } from '@/components/TripInfo';
import { Countdown } from '@/components/Countdown';
import { Itinerary } from '@/components/Itinerary';
import { RoomAssignments } from '@/components/RoomAssignments';
import { Weather } from '@/components/Weather';
import { SubNavigation } from '@/components/SubNavigation';
import { shouldShowCountdown } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n-context';
import { getTranslation } from '@/lib/translations';

export default function Home() {
  const [showCountdown, setShowCountdown] = useState(false);
  const { lang } = useI18n();

  useEffect(() => {
    setShowCountdown(shouldShowCountdown());
    // Update every hour
    const interval = setInterval(() => {
      setShowCountdown(shouldShowCountdown());
    }, 3600000);
    return () => clearInterval(interval);
  }, []);

  const subNavItems = [
    { id: 'trip-info', label: getTranslation(lang, 'tripInfo') },
    { id: 'itinerary', label: getTranslation(lang, 'itinerary') },
    { id: 'rooms', label: getTranslation(lang, 'roomAssignments') },
    { id: 'weather', label: getTranslation(lang, 'weather') },
  ];

  return (
    <>
      <SubNavigation items={subNavItems} />
      <Hero />
      <section id="trip-info" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 gap-6 ${showCountdown ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
            <TripInfo />
            {showCountdown && <Countdown />}
          </div>
        </div>
      </section>
      <div id="itinerary">
        <Itinerary />
      </div>
      <div id="rooms">
        <RoomAssignments />
      </div>
      <div id="weather">
        <Weather />
      </div>
    </>
  );
}