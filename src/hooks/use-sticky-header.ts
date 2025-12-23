import { RefObject, useEffect, useRef, useState } from 'react';

interface UseStickyHeaderReturn {
  isSticky: boolean;
  headerHeight: number;
  headerRef: RefObject<HTMLElement | null>;
  categoryRef: RefObject<HTMLElement | null>;
}

export const useStickyHeader = (): UseStickyHeaderReturn => {
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const categoryRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const lastStickyStateRef = useRef<boolean>(false);

  useEffect(() => {
    // Measure header height
    const measureHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        setHeaderHeight(height);
      }
    };

    measureHeaderHeight();

    // Update height on resize
    window.addEventListener('resize', measureHeaderHeight, { passive: true });

    return () => {
      window.removeEventListener('resize', measureHeaderHeight);
    };
  }, []);

  useEffect(() => {
    const updateStickyState = () => {
      if (!categoryRef.current) return;

      const categoryTop = categoryRef.current.getBoundingClientRect().top;
      const shouldBeSticky = categoryTop <= 0;

      // Only update state if it changed to prevent unnecessary re-renders
      if (shouldBeSticky !== lastStickyStateRef.current) {
        lastStickyStateRef.current = shouldBeSticky;
        setIsSticky(shouldBeSticky);
      }

      rafIdRef.current = null;
    };

    const handleScroll = () => {
      // Use requestAnimationFrame to batch updates and only check during paint
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(updateStickyState);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check initial state
    updateStickyState();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return {
    isSticky,
    headerHeight,
    headerRef,
    categoryRef,
  };
};
