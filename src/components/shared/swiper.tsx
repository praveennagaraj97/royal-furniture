'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

interface SwiperProps {
  children: ReactNode;
  className?: string;
  gap?: number;
  showNavigation?: boolean;
  autoScroll?: boolean;
  autoScrollInterval?: number;
  hideArrowOnMobile?: boolean;
}

const Swiper: FC<SwiperProps> = ({
  children,
  className = '',
  gap = 6,
  showNavigation = true,
  autoScroll = false,
  autoScrollInterval = 5000,
  hideArrowOnMobile = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const checkScrollPosition = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const threshold = 5; // Use a small threshold to account for rounding

    setCanScrollLeft(scrollLeft > threshold);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - threshold);
  }, []);

  const scrollTo = useCallback((direction: 'left' | 'right') => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of container width
    const targetScrollLeft =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth',
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 150);
    }

    checkScrollPosition();
  }, [isScrolling, checkScrollPosition]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      if (canScrollRight) {
        scrollTo('right');
      } else {
        // Reset to beginning when reaching the end
        if (containerRef.current) {
          containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [autoScroll, autoScrollInterval, canScrollRight, scrollTo]);

  useEffect(() => {
    // Initial check after render
    const timeoutId = setTimeout(() => {
      checkScrollPosition();
    }, 0);

    // Use ResizeObserver to detect content size changes
    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        checkScrollPosition();
      });
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', checkScrollPosition);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkScrollPosition);
      if (resizeObserver && containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [checkScrollPosition]);

  return (
    <div className={`relative group ${className}`}>
      {/* Navigation Buttons */}
      {showNavigation && (
        <>
          {/* Previous Button */}
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={() => scrollTo('left')}
              className={`absolute -left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-105 opacity-0 group-hover:opacity-100 cursor-pointer ${
                hideArrowOnMobile ? 'hidden md:block' : ''
              }`}
              disabled={isScrolling}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </motion.button>
          )}

          {/* Next Button */}
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={() => scrollTo('right')}
              className={`absolute -right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-105 opacity-0 group-hover:opacity-100 cursor-pointer ${
                hideArrowOnMobile ? 'hidden md:block' : ''
              }`}
              disabled={isScrolling}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </motion.button>
          )}
        </>
      )}

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-2 pb-6 px-4"
        style={{
          gap: `${gap * 0.25}rem`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Swiper;
