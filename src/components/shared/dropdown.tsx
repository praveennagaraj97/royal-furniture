'use client';

import { useClickOutside } from '@/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

type DropdownProps = {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
};

const Dropdown: FC<DropdownProps> = ({
  trigger,
  children,
  align = 'right',
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [panelPosition, setPanelPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  useClickOutside({
    ref: containerRef,
    handler: () => setOpen(false),
    enabled: open,
  });

  useEffect(() => {
    if (!open || !containerRef.current) return;

    const updatePosition = () => {
      if (!containerRef.current) return;

      const triggerRect = containerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 16;
      const gap = 8; // gap between trigger and dropdown

      // Get actual panel width if available, otherwise use approximate
      const panelWidth = panelRef.current?.offsetWidth || 180;
      const panelHeight = panelRef.current?.offsetHeight || 200;

      // Calculate initial position based on align prop
      let left =
        align === 'right' ? triggerRect.right - panelWidth : triggerRect.left;

      let top = triggerRect.bottom + gap;

      // Smart positioning: prevent going outside viewport
      // Horizontal adjustments
      if (left + panelWidth > viewportWidth - padding) {
        // If dropdown would overflow on the right, align to right edge
        left = viewportWidth - panelWidth - padding;
      }
      if (left < padding) {
        // If dropdown would overflow on the left, align to left edge
        left = padding;
      }

      // Vertical adjustments
      const spaceBelow = viewportHeight - triggerRect.bottom - gap;
      const spaceAbove = triggerRect.top - gap;

      if (spaceBelow < panelHeight && spaceAbove > spaceBelow) {
        // If not enough space below but more space above, show above
        top = triggerRect.top - panelHeight - gap;
      } else if (spaceBelow < panelHeight) {
        // If not enough space below and not enough above, fit to viewport
        top = Math.max(padding, viewportHeight - panelHeight - padding);
      }

      // Ensure dropdown doesn't go above viewport
      if (top < padding) {
        top = padding;
      }

      // Use fixed positioning with viewport coordinates (no scroll offset needed)
      setPanelPosition({ top, left });
    };

    // Initial position calculation
    updatePosition();

    // Recalculate position after panel renders to get accurate dimensions
    const rafId = requestAnimationFrame(() => {
      updatePosition();
    });

    // Use requestAnimationFrame for smooth updates during scroll
    let scrollRafId: number;
    const handleScroll = () => {
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      scrollRafId = requestAnimationFrame(updatePosition);
    };

    // Listen to scroll events on window and all scrollable parents
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', updatePosition);

    // Also listen to scroll on document and body
    document.addEventListener('scroll', handleScroll, true);
    document.body.addEventListener('scroll', handleScroll, true);

    return () => {
      cancelAnimationFrame(rafId);
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('scroll', handleScroll, true);
      document.body.removeEventListener('scroll', handleScroll, true);
    };
  }, [align, open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center"
      >
        {trigger}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="fixed z-50"
            style={
              panelPosition
                ? {
                    top: `${panelPosition.top}px`,
                    left: `${panelPosition.left}px`,
                  }
                : { visibility: 'hidden' }
            }
          >
            <div
              className="max-h-[min(320px,70vh)] w-40 sm:w-44 max-w-[calc(100vw-2rem)] overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
              onClick={() => setOpen(false)}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
