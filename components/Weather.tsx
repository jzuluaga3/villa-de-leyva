'use client';

import { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, CloudLightning } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { getTranslation } from '@/lib/translations';
import { celsiusToFahrenheit, getWeatherIcon } from '@/lib/utils';

interface WeatherData {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
}

export function Weather() {
  const { lang } = useI18n();
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTripWeather, setIsTripWeather] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Check if trip dates are in the allowed range
        // API allows dates from 2025-08-20 to 2025-12-06
        const tripStartDate = new Date('2025-12-30');
        const maxAllowedDate = new Date('2025-12-06');
        
        const canFetchTripWeather = tripStartDate <= maxAllowedDate;

        if (canFetchTripWeather) {
          // Try to fetch weather for the trip dates first
          const tripUrl = 'https://api.open-meteo.com/v1/forecast?latitude=5.6344&longitude=-73.5264&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=America/Bogota&start_date=2025-12-30&end_date=2026-01-02';
          
          try {
            const response = await fetch(tripUrl);
            const data = await response.json();
            
            // Check if API returned an error in the response (even if status is 200)
            if (data.error || !response.ok) {
              const errorMessage = data.reason || data.error || 'Date range error';
              if (errorMessage.includes('out of allowed range') || !response.ok) {
                throw new Error('Date range error');
              }
            }
            
            if (data.daily && data.daily.time) {
              const forecast: WeatherData[] = data.daily.time.map((date: string, index: number) => ({
                date,
                maxTemp: data.daily.temperature_2m_max[index],
                minTemp: data.daily.temperature_2m_min[index],
                weatherCode: data.daily.weathercode[index],
              }));
              setWeatherData(forecast);
              setIsTripWeather(true);
              setLoading(false);
              return;
            }
          } catch (tripError: any) {
            // If trip weather fails (especially date range errors), fall through to current weather
            console.log('Trip weather not available, using current weather:', tripError.message);
          }
        }

        // Fallback: get current weather forecast
        const currentUrl = 'https://api.open-meteo.com/v1/forecast?latitude=5.6344&longitude=-73.5264&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=America/Bogota&forecast_days=4';
        const fallbackResponse = await fetch(currentUrl);
        
        if (!fallbackResponse.ok) {
          throw new Error('Failed to fetch current weather');
        }
        
        const fallbackData = await fallbackResponse.json();
        
        if (fallbackData.daily && fallbackData.daily.time) {
          const forecast: WeatherData[] = fallbackData.daily.time.map((date: string, index: number) => ({
            date,
            maxTemp: fallbackData.daily.temperature_2m_max[index],
            minTemp: fallbackData.daily.temperature_2m_min[index],
            weatherCode: fallbackData.daily.weathercode[index],
          }));
          setWeatherData(forecast);
          setIsTripWeather(false);
        } else {
          throw new Error('No weather data in response');
        }
      } catch (err) {
        setError('Unable to load weather data');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString(lang === 'es' ? 'es-CO' : 'en-US', { weekday: 'short' });
    const month = date.toLocaleDateString(lang === 'es' ? 'es-CO' : 'en-US', { month: 'short' });
    const day = date.getDate();
    return { dayName, month, day };
  };

  const formatTemp = (celsius: number): string => {
    if (lang === 'en') {
      return `${celsiusToFahrenheit(celsius)}°F`;
    }
    return `${Math.round(celsius)}°C`;
  };

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-center">
            <p className="text-text-secondary">{lang === 'es' ? 'Cargando clima...' : 'Loading weather...'}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || weatherData.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-center">
            <p className="text-text-secondary">
              {error || (lang === 'es' ? 'No hay datos del clima disponibles' : 'No weather data available')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-text-primary mb-2">
            {isTripWeather ? getTranslation(lang, 'tripWeather') : getTranslation(lang, 'currentWeather')} - Villa de Leyva
          </h2>
          <p className="text-sm text-text-secondary">
            {isTripWeather ? getTranslation(lang, 'tripWeatherSubtitle') : getTranslation(lang, 'currentWeatherSubtitle')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {weatherData.map((day: WeatherData, index: number) => {
              const { dayName, month, day: dayNum } = formatDate(day.date);
              return (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-4xl mb-2">{getWeatherIcon(day.weatherCode)}</div>
                  <p className="font-semibold text-text-primary mb-1">
                    {dayName}
                  </p>
                  <p className="text-sm text-text-secondary mb-3">
                    {month} {dayNum}
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm text-text-primary">
                      <span className="text-text-secondary">{getTranslation(lang, 'high')}: </span>
                      <span className="font-semibold">{formatTemp(day.maxTemp)}</span>
                    </p>
                    <p className="text-sm text-text-primary">
                      <span className="text-text-secondary">{getTranslation(lang, 'low')}: </span>
                      <span className="font-semibold">{formatTemp(day.minTemp)}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}