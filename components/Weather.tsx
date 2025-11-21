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

interface CurrentWeather {
  temperature: number;
  weatherCode: number;
}

export function Weather() {
  const { lang } = useI18n();
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
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

        // Fallback: get current weather and forecast
        const currentUrl = 'https://api.open-meteo.com/v1/forecast?latitude=5.6344&longitude=-73.5264&current=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=America/Bogota&forecast_days=5';
        const fallbackResponse = await fetch(currentUrl);
        
        if (!fallbackResponse.ok) {
          throw new Error('Failed to fetch current weather');
        }
        
        const fallbackData = await fallbackResponse.json();
        
        // Set current weather
        if (fallbackData.current) {
          setCurrentWeather({
            temperature: fallbackData.current.temperature_2m,
            weatherCode: fallbackData.current.weathercode,
          });
        }
        
        // Filter forecast to start from today
        if (fallbackData.daily && fallbackData.daily.time) {
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Reset to start of day
          
          const forecast: WeatherData[] = fallbackData.daily.time
            .map((dateString: string, index: number) => ({
              date: dateString,
              maxTemp: fallbackData.daily.temperature_2m_max[index],
              minTemp: fallbackData.daily.temperature_2m_min[index],
              weatherCode: fallbackData.daily.weathercode[index],
            }))
            .filter((day: WeatherData) => {
              const dayDate = new Date(day.date);
              dayDate.setHours(0, 0, 0, 0);
              return dayDate >= today;
            })
            .slice(0, 4); // Take only next 4 days
          
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
      <section className="py-8 md:py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
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
      <section className="py-8 md:py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
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
    <section className="py-8 md:py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-text-primary mb-2">
            {getTranslation(lang, 'weather')} - Villa de Leyva
          </h2>
          <p className="text-sm text-text-secondary">
            {isTripWeather ? getTranslation(lang, 'tripWeatherSubtitle') : getTranslation(lang, 'currentWeatherSubtitle')}
          </p>
        </div>

        <div className="space-y-6">
          {/* Current Weather */}
          {currentWeather && !isTripWeather && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-text-primary mb-4 text-center">
                {lang === 'es' ? 'Clima Actual' : 'Current Weather'}
              </h3>
              <div className="flex items-center justify-center gap-6">
                <div className="text-6xl">{getWeatherIcon(currentWeather.weatherCode)}</div>
                <div className="text-left">
                  <p className="text-4xl font-bold text-text-primary mb-1">
                    {formatTemp(currentWeather.temperature)}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {lang === 'es' ? 'Ahora en Villa de Leyva' : 'Right now in Villa de Leyva'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Forecast */}
          {weatherData.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-text-primary mb-4 text-center">
                {isTripWeather 
                  ? (lang === 'es' ? 'Pronóstico del Viaje' : 'Trip Forecast')
                  : (lang === 'es' ? 'Pronóstico de los Próximos Días' : 'Forecast')
                }
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {weatherData.map((day: WeatherData, index: number) => {
                  const { dayName, month, day: dayNum } = formatDate(day.date);
                  const isToday = new Date(day.date).toDateString() === new Date().toDateString();
                  return (
                    <div
                      key={index}
                      className="text-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-4xl mb-2">{getWeatherIcon(day.weatherCode)}</div>
                      <p className="font-semibold text-text-primary mb-1">
                        {isToday ? (lang === 'es' ? 'Hoy' : 'Today') : dayName}
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
          )}
        </div>
      </div>
    </section>
  );
}