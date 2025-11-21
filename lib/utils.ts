import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

export function getDaysUntilTrip(): number {
  const tripStart = new Date('2025-12-30T15:00:00-05:00'); // Colombia time
  const now = new Date();
  const diffTime = tripStart.getTime() - now.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

export function shouldShowCountdown(): boolean {
  const tripStart = new Date('2025-12-30T15:00:00-05:00'); // Colombia time
  const now = new Date();
  return now < tripStart;
}

export function getWeatherIcon(weatherCode: number): string {
  if (weatherCode === 0) return '☀️'; // Clear sky
  if (weatherCode >= 1 && weatherCode <= 3) return '⛅'; // Partly cloudy
  if (weatherCode === 45 || weatherCode === 48) return '🌫️'; // Fog
  if (weatherCode >= 51 && weatherCode <= 67) return '🌧️'; // Rain
  if (weatherCode >= 71 && weatherCode <= 77) return '🌨️'; // Snow
  if (weatherCode >= 80 && weatherCode <= 99) return '⛈️'; // Thunderstorm
  return '☁️'; // Default cloudy
}
