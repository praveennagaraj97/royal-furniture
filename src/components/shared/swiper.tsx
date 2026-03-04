'use client';

import { motion } from 'framer-motion';
import {
  FC,
  ReactNode,
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface SwiperProps {
  children: ReactNode;
  className?: string;
  gap?: number;
  showNavigation?: boolean;
  autoScroll?: boolean;
  autoScrollInterval?: number;
  hideArrowOnMobile?: boolean;
  alwaysAlignStart?: boolean;
}

const Swiper: FC<SwiperProps> = ({
  children,
  className = '',
  gap = 6,
  showNavigation = true,
  autoScroll = false,
  autoScrollInterval = 5000,
  hideArrowOnMobile = false,
  alwaysAlignStart = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isCentered, setIsCentered] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isHorizontalScrollRef = useRef<boolean | null>(null);

  const checkScrollPosition = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const threshold = 5; // Use a small threshold to account for rounding
    const isRTL =
      document.dir === 'rtl' || document.documentElement.dir === 'rtl';

    setIsCentered(scrollWidth <= clientWidth);

    if (isRTL) {
      // Handle RTL scroll behavior
      // Most modern browsers use negative scroll values for RTL
      const normalizeScroll = Math.abs(scrollLeft);
      const maxScroll = scrollWidth - clientWidth;

      // Right button (Go Right/Start): Visible if we have scrolled away from 0
      setCanScrollRight(normalizeScroll > threshold);

      // Left button (Go Left/End): Visible if we haven't reached the end
      setCanScrollLeft(normalizeScroll < maxScroll - threshold);
    } else {
      setCanScrollLeft(scrollLeft > threshold);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - threshold);
    }
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

  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    isHorizontalScrollRef.current = null;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current || !containerRef.current) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

    // Determine scroll direction on first significant movement (threshold: 10px)
    if (
      isHorizontalScrollRef.current === null &&
      (deltaX > 10 || deltaY > 10)
    ) {
      isHorizontalScrollRef.current = deltaX > deltaY;
    }

    // If it's a vertical scroll, don't interfere - let it propagate to parent
    if (isHorizontalScrollRef.current === false) {
      return;
    }

    // If it's a horizontal scroll, check if swiper can scroll in that direction
    if (isHorizontalScrollRef.current === true) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const canScrollLeft = scrollLeft > 0;
      const canScrollRight = scrollLeft < scrollWidth - clientWidth - 1;
      const scrollingLeft = touch.clientX < touchStartRef.current.x;
      const scrollingRight = touch.clientX > touchStartRef.current.x;

      // Only prevent default if swiper can actually scroll in that direction
      if (
        (scrollingLeft && canScrollLeft) ||
        (scrollingRight && canScrollRight)
      ) {
        // Allow horizontal scrolling within swiper
        return;
      }
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
    isHorizontalScrollRef.current = null;
  }, []);

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
    <div
      className={`relative group w-full max-w-[calc(100vw-7rem)] overflow-visible ${className} `}
    >
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`flex overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden overscroll-x-contain ${!alwaysAlignStart && isCentered ? 'justify-center' : 'justify-start'}`}
        style={{
          gap: `${gap * 0.25}rem`,
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x pan-y',
        }}
      >
        {children}
      </div>

      {/* Navigation Buttons Wrapper */}
      {showNavigation && (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          {/* Previous Button */}
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={() => scrollTo('left')}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-105 opacity-0 group-hover:opacity-100 cursor-pointer pointer-events-auto ${
                hideArrowOnMobile ? 'hidden md:block' : ''
              }`}
              disabled={isScrolling}
              aria-label="Scroll left"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-700 rtl:rotate-180" />
            </motion.button>
          )}

          {/* Next Button */}
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={() => scrollTo('right')}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-105 opacity-0 group-hover:opacity-100 cursor-pointer pointer-events-auto ${
                hideArrowOnMobile ? 'hidden md:block' : ''
              }`}
              disabled={isScrolling}
              aria-label="Scroll right"
            >
              <FiChevronRight className="w-5 h-5 text-gray-700 rtl:rotate-180" />
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
};

export default Swiper;
