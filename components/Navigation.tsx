'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { getTranslation, type Language } from '@/lib/translations';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n-context';
import { WeatherWidget } from './WeatherWidget';

export function Navigation() {
  const { lang, setLang } = useI18n();
  const pathname = usePathname();
  const googleMapsLink = process.env.NEXT_PUBLIC_GOOGLE_MAPS_LINK;

  const toggleLanguage = () => {
    setLang(lang === 'es' ? 'en' : 'es');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              href="/"
              className={cn(
                'text-sm font-semibold transition-all duration-200 relative',
                pathname === '/' 
                  ? 'text-primary' 
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {getTranslation(lang, 'home')}
              {pathname === '/' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
            <Link
              href="/things-to-do"
              className={cn(
                'text-sm font-semibold transition-all duration-200 relative',
                pathname === '/things-to-do'
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {getTranslation(lang, 'thingsToDo')}
              {pathname === '/things-to-do' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {googleMapsLink && (
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-hover transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label={getTranslation(lang, 'getDirections')}
              >
                <MapPin className="w-4 h-4" />
                {getTranslation(lang, 'getDirections')}
              </a>
            )}

            <WeatherWidget />

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-all duration-200 rounded-lg hover:bg-gray-100"
              aria-label="Toggle language"
            >
              <span className={cn(
                'px-1.5 transition-all duration-200',
                lang === 'es' ? 'text-primary font-bold' : ''
              )}>ES</span>
              <span className="text-gray-300">|</span>
              <span className={cn(
                'px-1.5 transition-all duration-200',
                lang === 'en' ? 'text-primary font-bold' : ''
              )}>EN</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
