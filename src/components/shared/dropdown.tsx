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

      const rect = containerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const padding = 16;
      const panelWidth = 200; // approximate dropdown width in px

      let left =
        align === 'right'
          ? rect.right - panelWidth + window.scrollX
          : rect.left + window.scrollX;

      const top = rect.bottom + 8 + window.scrollY;

      const maxLeft = viewportWidth - panelWidth - padding;
      if (left > maxLeft) left = maxLeft;
      if (left < padding) left = padding;

      setPanelPosition({ top, left });
    };

    updatePosition();

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
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
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="fixed z-50"
            style={
              panelPosition
                ? {
                    top: panelPosition.top,
                    left: panelPosition.left,
                  }
                : undefined
            }
          >
            <div className="mt-2 max-h-[min(320px,70vh)] w-40 sm:w-44 max-w-[calc(100vw-2rem)] overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
