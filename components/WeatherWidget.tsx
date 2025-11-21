'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n-context';
import { celsiusToFahrenheit, getWeatherIcon } from '@/lib/utils';

interface CurrentWeather {
  temperature: number;
  weatherCode: number;
}

export function WeatherWidget() {
  const { lang } = useI18n();
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrentWeather() {
      try {
        // Use the same API call as the Weather component
        const currentUrl = 'https://api.open-meteo.com/v1/forecast?latitude=5.6344&longitude=-73.5264&current=temperature_2m,weathercode&timezone=America/Bogota';
        const response = await fetch(currentUrl);
        
        if (!response.ok) {
          throw new Error('Failed to fetch current weather');
        }
        
        const data = await response.json();
        
        // Set current weather
        if (data.current) {
          setCurrentWeather({
            temperature: data.current.temperature_2m,
            weatherCode: data.current.weathercode,
          });
        }
      } catch (err) {
        console.error('Weather widget fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentWeather();
  }, []);

  const formatTemp = (celsius: number): string => {
    if (lang === 'en') {
      return `${celsiusToFahrenheit(celsius)}°F`;
    }
    return `${Math.round(celsius)}°C`;
  };

  if (loading || !currentWeather) {
    return null; // Don't show anything while loading or if there's an error
  }

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <span className="text-lg">{getWeatherIcon(currentWeather.weatherCode)}</span>
      <span className="font-medium text-text-primary">{formatTemp(currentWeather.temperature)}</span>
    </div>
  );
}

