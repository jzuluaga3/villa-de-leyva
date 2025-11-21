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
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-12 border border-gray-200 text-center">
          <div className="mb-4">
            <span className="text-7xl md:text-8xl font-bold text-primary">
              {daysRemaining}
            </span>
          </div>
          <p className="text-xl md:text-2xl font-semibold text-text-primary">
            {getTranslation(lang, 'daysUntil')}
          </p>
        </div>
      </div>
    </section>
  );
}