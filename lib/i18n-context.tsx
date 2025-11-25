'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Language } from './translations';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Detect language from URL pathname
  const getLangFromPath = (path: string): Language => {
    if (path.startsWith('/en')) {
      return 'en';
    }
    return 'es';
  };

  const [lang, setLang] = useState<Language>(() => getLangFromPath(pathname));

  // Update language when pathname changes
  useEffect(() => {
    const newLang = getLangFromPath(pathname);
    setLang(newLang);
  }, [pathname]);

  // Navigate to correct URL when language changes
  const handleSetLang = (newLang: Language) => {
    if (newLang === lang) return;

    let newPath = pathname;

    if (newLang === 'en') {
      // Switch to English URLs
      if (pathname === '/') {
        newPath = '/en';
      } else if (pathname === '/que-hacer') {
        newPath = '/en/things-to-do';
      } else if (pathname.startsWith('/en')) {
        // Already on English path, no change needed
        return;
      } else {
        // Default to /en for unknown paths
        newPath = '/en';
      }
    } else {
      // Switch to Spanish URLs
      if (pathname === '/en') {
        newPath = '/';
      } else if (pathname === '/en/things-to-do') {
        newPath = '/que-hacer';
      } else if (!pathname.startsWith('/en')) {
        // Already on Spanish path, no change needed
        return;
      } else {
        // Default to / for unknown paths
        newPath = '/';
      }
    }

    router.push(newPath);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
