'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MapPin, ChevronDown } from 'lucide-react';
import { getTranslation, type Language } from '@/lib/translations';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n-context';
import { WeatherWidget } from './WeatherWidget';

export function Navigation() {
  const { lang, setLang } = useI18n();
  const pathname = usePathname();
  const googleMapsLink = process.env.NEXT_PUBLIC_GOOGLE_MAPS_LINK;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <Link
              href="/"
              className="flex items-center transition-opacity duration-200 hover:opacity-80"
              aria-label="Home"
            >
              <Image
                src="/favicon.png"
                alt="Villa de Leyva"
                width={60}
                height={60}
                className="w-[60px] h-[60px] rounded object-contain flex-shrink-0"
              />
            </Link>
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

          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
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

            {/* Language dropdown - styled for all screen sizes */}
            <div className="relative">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-5 py-1.5 text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 cursor-pointer hover:border-gray-400 shadow-sm"
                aria-label="Select language"
              >
                <option value="es">🇨🇴 ES</option>
                <option value="en">🇺🇸 EN</option>
              </select>
              <ChevronDown 
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" 
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
