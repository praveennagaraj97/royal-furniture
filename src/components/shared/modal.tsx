'use client';

import Portal from '@/components/shared/portal';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState, type FC, type ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  blurBackdrop?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'side' | 'center' | 'bottom';
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  blurBackdrop = false,
  size = 'md',
  className = '',
  variant = 'side',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const mouseDownPosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBackdropMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      mouseDownPosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleBackdropMouseUp = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && mouseDownPosition.current) {
      const deltaX = Math.abs(e.clientX - mouseDownPosition.current.x);
      const deltaY = Math.abs(e.clientY - mouseDownPosition.current.y);
      const threshold = 5; // pixels

      // Only close if it's a click (not a drag)
      if (deltaX < threshold && deltaY < threshold) {
        onClose();
      }
      mouseDownPosition.current = null;
    }
  };

  const handleBackdropTouchStart = (e: React.TouchEvent) => {
    if (e.target === e.currentTarget) {
      const touch = e.touches[0];
      mouseDownPosition.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleBackdropTouchEnd = (e: React.TouchEvent) => {
    if (e.target === e.currentTarget && mouseDownPosition.current) {
      const touch = e.changedTouches[0];
      const deltaX = Math.abs(touch.clientX - mouseDownPosition.current.x);
      const deltaY = Math.abs(touch.clientY - mouseDownPosition.current.y);
      const threshold = 5; // pixels

      // Only close if it's a tap (not a drag)
      if (deltaX < threshold && deltaY < threshold) {
        onClose();
      }
      mouseDownPosition.current = null;
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sizeClassMap = {
    sm: 'modal-size-sm',
    md: 'modal-size-md',
    lg: 'modal-size-lg',
    xl: 'modal-size-xl',
  };

  if (variant === 'bottom') {
    return (
      <Portal blurBackdrop={blurBackdrop}>
        <AnimatePresence mode="wait">
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                ref={backdropRef}
                className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center sm:justify-center p-0 sm:p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onMouseDown={handleBackdropMouseDown}
                onMouseUp={handleBackdropMouseUp}
                onTouchStart={handleBackdropTouchStart}
                onTouchEnd={handleBackdropTouchEnd}
              >
                {/* Modal Content */}
                <motion.div
                  ref={modalRef}
                  className={`bg-white rounded-t-2xl sm:rounded-lg shadow-2xl w-full ${sizeClassMap[size]} ${className} flex flex-col overflow-hidden max-h-[95vh]`}
                  initial={
                    isMobile
                      ? { opacity: 0, y: '100%' }
                      : { opacity: 0, scale: 0.95, y: 20 }
                  }
                  animate={
                    isMobile
                      ? { opacity: 1, y: 0 }
                      : { opacity: 1, scale: 1, y: 0 }
                  }
                  exit={
                    isMobile
                      ? { opacity: 0, y: '100%' }
                      : { opacity: 0, scale: 0.95, y: 20 }
                  }
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                  onClick={(e) => e.stopPropagation()}
                  style={
                    isMobile
                      ? { paddingBottom: 'env(safe-area-inset-bottom)' }
                      : undefined
                  }
                >
                  {children}
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Portal>
    );
  }

  if (variant === 'center') {
    return (
      <Portal blurBackdrop={blurBackdrop}>
        <AnimatePresence mode="wait">
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                ref={backdropRef}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onMouseDown={handleBackdropMouseDown}
                onMouseUp={handleBackdropMouseUp}
                onTouchStart={handleBackdropTouchStart}
                onTouchEnd={handleBackdropTouchEnd}
              >
                {/* Modal Content */}
                <motion.div
                  ref={modalRef}
                  className={`bg-white rounded-lg shadow-2xl w-full ${sizeClassMap[size]} ${className} flex flex-col overflow-hidden`}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeOut',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {children}
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Portal>
    );
  }

  return (
    <Portal blurBackdrop={blurBackdrop}>
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              ref={backdropRef}
              className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-start sm:justify-end p-0 sm:p-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onMouseDown={handleBackdropMouseDown}
              onMouseUp={handleBackdropMouseUp}
              onTouchStart={handleBackdropTouchStart}
              onTouchEnd={handleBackdropTouchEnd}
            >
              {/* Modal Content */}
              <motion.div
                ref={modalRef}
                className={`bg-white rounded-t-2xl sm:rounded-l-2xl sm:rounded-t-2xl shadow-2xl w-full sm:w-auto sm:min-w-[400px] sm:max-w-[500px] ${sizeClassMap[size]} ${className} fixed sm:fixed bottom-0 sm:bottom-0 left-0 sm:left-auto right-0 sm:right-0 sm:top-0 sm:h-screen max-h-[95vh] sm:max-h-none flex flex-col overflow-hidden`}
                initial={
                  isMobile
                    ? { opacity: 0, y: '100%' }
                    : { opacity: 0, x: '100%' }
                }
                animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
                exit={
                  isMobile
                    ? { opacity: 0, y: '100%' }
                    : { opacity: 0, x: '100%' }
                }
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {children}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default Modal;
