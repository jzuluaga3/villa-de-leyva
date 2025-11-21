'use client';

import Image from 'next/image';
import { useI18n } from '@/lib/i18n-context';
import { getTranslation } from '@/lib/translations';

export function Hero() {
  const { lang } = useI18n();

  return (
    <section className="relative w-full h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Reference/411b7bf9-e9e3-41ce-9b4c-02ee97b99572.avif"
          alt={getTranslation(lang, 'title')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          {getTranslation(lang, 'title')}
        </h1>
        <p className="text-xl md:text-2xl font-medium drop-shadow-md">
          {lang === 'es' 
            ? '30 de Diciembre, 2025 - 2 de Enero, 2026'
            : 'December 30, 2025 - January 2, 2026'
          }
        </p>
      </div>
    </section>
  );
}