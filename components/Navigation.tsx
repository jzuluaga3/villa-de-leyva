'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { getTranslation, type Language } from '@/lib/translations';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n-context';

export function Navigation() {
  const { lang, setLang } = useI18n();
  const pathname = usePathname();
  const googleMapsLink = process.env.NEXT_PUBLIC_GOOGLE_MAPS_LINK;

  const toggleLanguage = () => {
    setLang(lang === 'es' ? 'en' : 'es');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <h1 className="text-lg font-semibold text-text-primary">
              {getTranslation(lang, 'title')}
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === '/' ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {getTranslation(lang, 'home')}
              </Link>
              <Link
                href="/things-to-do"
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === '/things-to-do'
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {getTranslation(lang, 'thingsToDo')}
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {googleMapsLink && (
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  aria-label={getTranslation(lang, 'getDirections')}
                >
                  <MapPin className="w-4 h-4" />
                  {getTranslation(lang, 'getDirections')}
                </a>
              )}

              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Toggle language"
              >
                <span className={lang === 'es' ? 'text-primary font-semibold' : ''}>ES</span>
                <span>|</span>
                <span className={lang === 'en' ? 'text-primary font-semibold' : ''}>EN</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
