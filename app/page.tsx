'use client';

import { Hero } from '@/components/Hero';
import { TripInfo } from '@/components/TripInfo';
import { Countdown } from '@/components/Countdown';
import { Itinerary } from '@/components/Itinerary';
import { RoomAssignments } from '@/components/RoomAssignments';
import { Weather } from '@/components/Weather';
import { shouldShowCountdown } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Home() {
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    setShowCountdown(shouldShowCountdown());
    // Update every hour
    const interval = setInterval(() => {
      setShowCountdown(shouldShowCountdown());
    }, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Hero />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 gap-6 ${showCountdown ? 'lg:grid-cols-2' : 'lg:grid-cols-1 lg:max-w-3xl lg:mx-auto'}`}>
            <TripInfo />
            {showCountdown && <Countdown />}
          </div>
        </div>
      </section>
      <Itinerary />
      <RoomAssignments />
      <Weather />
    </>
  );
}