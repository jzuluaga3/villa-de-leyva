'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n-context';
import { getTranslation } from '@/lib/translations';
import { shouldShowCountdown, getDaysUntilTrip } from '@/lib/utils';

export function Countdown() {
  const { lang } = useI18n();
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(shouldShowCountdown());
    setDaysRemaining(getDaysUntilTrip());

    // Update every hour
    const interval = setInterval(() => {
      setShow(shouldShowCountdown());
      setDaysRemaining(getDaysUntilTrip());
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-12 border border-gray-200 text-center h-full flex flex-col justify-center">
      <div className="mb-4">
        <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-primary">
          {daysRemaining}
        </span>
      </div>
      <p className="text-lg md:text-xl lg:text-2xl font-semibold text-text-primary">
        {getTranslation(lang, 'daysUntil')}
      </p>
    </div>
  );
}