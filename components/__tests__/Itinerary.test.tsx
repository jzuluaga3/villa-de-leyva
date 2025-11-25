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
});

