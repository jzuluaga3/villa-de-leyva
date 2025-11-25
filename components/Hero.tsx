'use client';

import Image from 'next/image';
import { useI18n } from '@/lib/i18n-context';
import { getTranslation } from '@/lib/translations';

export function Hero() {
  const { lang } = useI18n();

  return (
    <section className="relative w-full h-[80vh] min-h-[500px] max-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Reference/411b7bf9-e9e3-41ce-9b4c-02ee97b99572.avif"
          alt={getTranslation(lang, 'title')}
          fill
          className="object-cover scale-105 transition-transform duration-700 ease-out"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>
      
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl leading-tight tracking-tight">
            <span className="block mb-2">{getTranslation(lang, 'title')}</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium drop-shadow-lg text-white/95">
            {lang === 'es' 
              ? '30 de Diciembre, 2025 - 2 de Enero, 2026'
              : 'December 30, 2025 - January 2, 2026'
            }
          </p>
        </div>
      </div>
    </section>
  );
}