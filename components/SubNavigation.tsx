'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n-context';
import { getTranslation } from '@/lib/translations';
import { cn } from '@/lib/utils';

interface SubNavItem {
  id: string;
  label: string;
}

interface SubNavigationProps {
  items: SubNavItem[];
}

export function SubNavigation({ items }: SubNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const pathname = usePathname();
  const { lang } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      // Ensure we're in the browser and elements exist
      if (typeof window === 'undefined') return;
      
      // Find active section based on scroll position
      const sections = items.map((item) => {
        const element = document.getElementById(item.id);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          id: item.id,
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
          height: rect.height,
        };
      }).filter(Boolean) as Array<{ id: string; top: number; bottom: number; height: number }>;
      
      if (sections.length === 0) return;

      const navOffset = 200; // Offset for sticky nav height
      const currentScroll = window.scrollY + navOffset;

      // Find the section we're currently in
      let activeId = '';
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (currentScroll >= section.top - navOffset && currentScroll < section.bottom) {
          activeId = section.id;
          break;
        }
      }

      // If we're past all sections, highlight the last one
      if (!activeId && sections.length > 0) {
        const lastSection = sections[sections.length - 1];
        if (currentScroll >= lastSection.top) {
          activeId = lastSection.id;
        }
      }

      // If we're before all sections, highlight the first one
      if (!activeId && sections.length > 0) {
        activeId = sections[0].id;
      }

      setActiveSection(activeId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, pathname]);

  const handleClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80; // Account for sticky nav height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          {items.map((item) => (
            <a
              key={item.id}
              href={`${pathname}#${item.id}`}
              onClick={(e) => handleClick(item.id, e)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200',
                activeSection === item.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

