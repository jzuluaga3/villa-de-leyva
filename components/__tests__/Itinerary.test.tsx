import React from 'react';
import { render, screen } from '@testing-library/react';
import { Itinerary } from '../Itinerary';
import { I18nProvider } from '@/lib/i18n-context';

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Itinerary Component', () => {
  const renderItinerary = () => {
    return render(
      <I18nProvider>
        <Itinerary />
      </I18nProvider>
    );
  };

  it('renders itinerary items', () => {
    renderItinerary();
    expect(screen.getByText(/Itinerario|Itinerary/i)).toBeInTheDocument();
  });

  describe('Timeline line behavior on mobile', () => {
    it('should have pseudo-element on last event to stop line on mobile breakpoint', () => {
      const { container } = renderItinerary();
      
      // Find all day cards
      const dayCards = container.querySelectorAll('[class*="space-y-5"]');
      
      dayCards.forEach((dayCard) => {
        // Find all event items within this day
        const eventItems = dayCard.querySelectorAll('.relative');
        
        if (eventItems.length > 1) {
          // Get the last event item
          const lastEvent = eventItems[eventItems.length - 1];
          
          // Check that the last event has the mobile pseudo-element classes
          // This ensures the line stops at the last bullet on mobile
          const lastEventClasses = lastEvent.className;
          
          expect(lastEventClasses).toContain('md:after:hidden');
          expect(lastEventClasses).toContain('after:absolute');
          expect(lastEventClasses).toContain('after:left-[10px]');
          expect(lastEventClasses).toContain('after:top-[calc(0.8125rem+0.3125rem)]');
          expect(lastEventClasses).toContain('after:bottom-0');
          expect(lastEventClasses).toContain('after:bg-white');
          expect(lastEventClasses).toContain('after:z-20');
        }
      });
    });

    it('should not apply pseudo-element classes when there is only one event', () => {
      const { container } = renderItinerary();
      
      // Find all day cards
      const dayCards = container.querySelectorAll('[class*="space-y-5"]');
      
      dayCards.forEach((dayCard) => {
        const eventItems = dayCard.querySelectorAll('.relative');
        
        if (eventItems.length === 1) {
          const eventClasses = eventItems[0].className;
          // Should not have the mobile pseudo-element classes when there's only one event
          expect(eventClasses).not.toContain('md:after:hidden');
        }
      });
    });

    it('should have dashed line element with correct mobile styling', () => {
      const { container } = renderItinerary();
      
      // Find the dashed line element
      const dashedLines = container.querySelectorAll('[style*="repeating-linear-gradient"]');
      
      dashedLines.forEach((line) => {
        const lineElement = line as HTMLElement;
        const styles = lineElement.style;
        
        // Check that the line has the mobile-specific height override removed
        // On mobile, it should use bottom positioning or height calculation
        // On desktop (md:), it should use bottom-[9px]
        expect(lineElement.className).toContain('md:bottom-[9px]');
        
        // Verify the line has the correct transform
        expect(styles.transform).toBe('translateX(-50%)');
        
        // Verify the background image is set correctly
        expect(styles.backgroundImage).toContain('repeating-linear-gradient');
      });
    });
  });

  describe('Typography and alignment', () => {
    it('should have consistent line height between time and activity names', () => {
      const { container } = renderItinerary();
      
      // Find all time elements
      const timeElements = container.querySelectorAll('span[class*="whitespace-nowrap"]');
      
      timeElements.forEach((timeElement) => {
        const timeStyles = window.getComputedStyle(timeElement as HTMLElement);
        const timeLineHeight = timeStyles.lineHeight;
        const timeFontSize = timeStyles.fontSize;
        
        // Find the corresponding activity name in the same event
        const eventContainer = timeElement.closest('.relative');
        if (eventContainer) {
          // Find activity description (could be in a span or button)
          const activityName = eventContainer.querySelector('span[class*="break-words"], button span[class*="break-words"]');
          
          if (activityName) {
            const activityStyles = window.getComputedStyle(activityName as HTMLElement);
            const activityLineHeight = activityStyles.lineHeight;
            const activityFontSize = activityStyles.fontSize;
            
            // Both should have the same font size (text-base)
            expect(activityFontSize).toBe(timeFontSize);
            
            // Both should have the same line height (leading-normal)
            expect(activityLineHeight).toBe(timeLineHeight);
          }
        }
      });
    });

    it('should have time as bold (font-semibold) and activity names as medium weight (font-medium)', () => {
      const { container } = renderItinerary();
      
      // Find all time elements
      const timeElements = container.querySelectorAll('span[class*="whitespace-nowrap"]');
      
      timeElements.forEach((timeElement) => {
        const timeClasses = timeElement.className;
        // Time should be bold
        expect(timeClasses).toContain('font-semibold');
        
        // Find the corresponding activity name
        const eventContainer = timeElement.closest('.relative');
        if (eventContainer) {
          const activityName = eventContainer.querySelector('span[class*="break-words"], button span[class*="break-words"]');
          
          if (activityName) {
            const activityClasses = activityName.className;
            // Activity name should be medium weight, not semibold
            expect(activityClasses).toContain('font-medium');
            expect(activityClasses).not.toContain('font-semibold');
          }
        }
      });
    });

    it('should have time and activity name on the same row (flex-row) on mobile', () => {
      const { container } = renderItinerary();
      
      // Find all event content containers
      const contentContainers = container.querySelectorAll('[class*="flex-row"][class*="items-baseline"]');
      
      expect(contentContainers.length).toBeGreaterThan(0);
      
      contentContainers.forEach((container) => {
        const classes = container.className;
        // Should use flex-row (not flex-col) for horizontal layout
        expect(classes).toContain('flex-row');
        expect(classes).not.toContain('flex-col');
        // Should use items-baseline for alignment
        expect(classes).toContain('items-baseline');
      });
    });

    it('should have time as non-wrapping (whitespace-nowrap) and flex-shrink-0', () => {
      const { container } = renderItinerary();
      
      const timeElements = container.querySelectorAll('span[class*="whitespace-nowrap"]');
      
      timeElements.forEach((timeElement) => {
        const classes = timeElement.className;
        // Time should not wrap
        expect(classes).toContain('whitespace-nowrap');
        // Time should not shrink
        expect(classes).toContain('flex-shrink-0');
      });
    });

    it('should have activity names in a flex-1 container that allows wrapping', () => {
      const { container } = renderItinerary();
      
      // Find all event items
      const eventItems = container.querySelectorAll('.relative');
      
      eventItems.forEach((eventItem) => {
        // Find the content container that should have flex-1
        const contentContainer = eventItem.querySelector('[class*="flex-1"][class*="min-w-0"]');
        
        expect(contentContainer).toBeTruthy();
        
        if (contentContainer) {
          const classes = contentContainer.className;
          // Should allow flex growth and wrapping
          expect(classes).toContain('flex-1');
          expect(classes).toContain('min-w-0');
        }
      });
    });

    it('should have activity names with break-words for proper wrapping', () => {
      const { container } = renderItinerary();
      
      // Find all activity description elements
      const activityNames = container.querySelectorAll('span[class*="break-words"], button span[class*="break-words"]');
      
      expect(activityNames.length).toBeGreaterThan(0);
      
      activityNames.forEach((activityName) => {
        const classes = activityName.className;
        // Should allow word breaking for long text
        expect(classes).toContain('break-words');
      });
    });

    it('should have bullet positioned to align with first line of text', () => {
      const { container } = renderItinerary();
      
      // Find all event items
      const eventItems = container.querySelectorAll('.relative');
      
      eventItems.forEach((eventItem) => {
        // Find the bullet container - it should have top-[0.8125rem] and contain a rounded-full div
        const bulletContainers = eventItem.querySelectorAll('div[class*="top-[0.8125rem]"]');
        
        bulletContainers.forEach((bulletContainer) => {
          // Check if this container has a rounded-full child (the actual bullet)
          const hasBullet = bulletContainer.querySelector('div[class*="rounded-full"]');
          
          if (hasBullet) {
            const bulletElement = bulletContainer as HTMLElement;
            const classes = bulletElement.className;
            
            // Bullet should be positioned at the same vertical position as first line
            expect(classes).toContain('top-[0.8125rem]');
            // Should be centered horizontally
            expect(bulletElement.style.transform).toContain('translateX(-50%)');
            // Should also have translateY(-50%) to center vertically
            expect(bulletElement.style.transform).toContain('translateY(-50%)');
          }
        });
      });
    });

    it('should have rental car and flight buttons with flex-wrap for responsive wrapping', () => {
      const { container } = renderItinerary();
      
      // Find rental car buttons
      const rentalCarButtons = container.querySelectorAll('button[class*="group"]');
      rentalCarButtons.forEach((button) => {
        const classes = button.className;
        // Should allow wrapping when needed
        expect(classes).toContain('flex-wrap');
      });
      
      // Find flight buttons - they should have flex-wrap on the inner container
      const flightButtons = container.querySelectorAll('button:has(svg[class*="lucide-plane"])');
      flightButtons.forEach((button) => {
        const innerContainer = button.querySelector('[class*="flex-wrap"]');
        expect(innerContainer).toBeTruthy();
      });
    });

    it('should maintain consistent text-base font size across time and activity names', () => {
      const { container } = renderItinerary();
      
      const timeElements = container.querySelectorAll('span[class*="whitespace-nowrap"]');
      
      timeElements.forEach((timeElement) => {
        const timeClasses = timeElement.className;
        expect(timeClasses).toContain('text-base');
        
        // Find corresponding activity name
        const eventContainer = timeElement.closest('.relative');
        if (eventContainer) {
          const activityName = eventContainer.querySelector('span[class*="break-words"], button span[class*="break-words"]');
          
          if (activityName) {
            const activityClasses = activityName.className;
            expect(activityClasses).toContain('text-base');
          }
        }
      });
    });
  });
});

