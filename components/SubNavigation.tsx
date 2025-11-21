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
    if (typeof window === 'undefined') return;

    const sections = items.map((item) => {
      const element = document.getElementById(item.id);
      return element ? { id: item.id, element } : null;
    }).filter(Boolean) as Array<{ id: string; element: HTMLElement }>;

    if (sections.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isAtBottom = scrollY + windowHeight >= documentHeight - 50;

      // If at bottom, always select last section
      if (isAtBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      // Find the section that's currently most visible
      const navOffset = 200;
      const viewportTop = scrollY + navOffset;
      
      let activeId = '';
      let maxIntersection = 0;

      for (const { id, element } of sections) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementBottom = rect.bottom + scrollY;
        
        // Calculate intersection with viewport (accounting for nav offset)
        const intersectionTop = Math.max(elementTop, viewportTop);
        const intersectionBottom = Math.min(elementBottom, scrollY + windowHeight);
        const intersection = Math.max(0, intersectionBottom - intersectionTop);
        
        // If this section intersects significantly with the viewport
        if (intersection > 100 || (rect.top <= navOffset && rect.bottom > navOffset)) {
          if (intersection > maxIntersection) {
            maxIntersection = intersection;
            activeId = id;
          }
        }
      }

      // Fallback: if no intersection found, find closest section
      if (!activeId) {
        let closestId = sections[0].id;
        let minDistance = Infinity;

        for (const { id, element } of sections) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          const distance = Math.abs(viewportTop - elementTop);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestId = id;
          }
        }

        // If we're past the last section, use the last one
        const lastSection = sections[sections.length - 1];
        const lastRect = lastSection.element.getBoundingClientRect();
        if (scrollY + windowHeight > lastRect.bottom + scrollY) {
          activeId = lastSection.id;
        } else {
          activeId = closestId;
        }
      }

      setActiveSection(activeId);
    };

    // Also check on scroll end to catch bottom-of-page case
    let scrollTimeout: NodeJS.Timeout;
    const handleScrollWithDebounce = () => {
      handleScroll();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 150);
    };

    window.addEventListener('scroll', handleScrollWithDebounce, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScrollWithDebounce);
      clearTimeout(scrollTimeout);
    };
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
                'px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 cursor-pointer',
                activeSection === item.id
                  ? 'bg-primary text-white shadow-sm hover:bg-primary/90'
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

