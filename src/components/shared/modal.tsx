'use client';

import Portal from '@/components/shared/portal';
import { AnimatePresence, motion } from 'framer-motion';
import {
  useEffect,
  useRef,
  useState,
  type FC,
  type MouseEvent,
  type ReactNode,
  type TouchEvent,
} from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  blurBackdrop?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'side' | 'center' | 'bottom';
  preventClose?: boolean;
  onCloseAttempt?: () => void;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  blurBackdrop = false,
  size = 'md',
  className = '',
  variant = 'side',
  preventClose = false,
  onCloseAttempt,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);
  const mouseDownPosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBackdropMouseDown = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      mouseDownPosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleBackdropMouseUp = (e: MouseEvent) => {
    if (e.target === e.currentTarget && mouseDownPosition.current) {
      const deltaX = Math.abs(e.clientX - mouseDownPosition.current.x);
      const deltaY = Math.abs(e.clientY - mouseDownPosition.current.y);
      const threshold = 5; // pixels

      // Only close if it's a click (not a drag)
      if (deltaX < threshold && deltaY < threshold) {
        // prevent the event from reaching underlying elements
        e.stopPropagation();
        e.preventDefault();
        if (preventClose) {
          // Trigger shake animation
          setShouldShake(true);
          setTimeout(() => setShouldShake(false), 500);
          if (onCloseAttempt) {
            onCloseAttempt();
          }
        } else {
          onClose();
        }
      }
      mouseDownPosition.current = null;
    }
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (preventClose && e.target === e.currentTarget) {
      // Trigger shake animation
      e.stopPropagation();
      e.preventDefault();
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 500);
      if (onCloseAttempt) {
        onCloseAttempt();
      }
    }
  };

  const handleBackdropClickCapture = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      // Always consume the click at capture phase so it cannot fall-through
      e.stopPropagation();
      e.preventDefault();
      if (preventClose) {
        setShouldShake(true);
        setTimeout(() => setShouldShake(false), 500);
        if (onCloseAttempt) onCloseAttempt();
      } else {
        onClose();
      }
    }
  };

  const handleBackdropTouchStart = (e: TouchEvent) => {
    if (e.target === e.currentTarget) {
      const touch = e.touches[0];
      mouseDownPosition.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleBackdropTouchEnd = (e: TouchEvent) => {
    if (e.target === e.currentTarget && mouseDownPosition.current) {
      const touch = e.changedTouches[0];
      const deltaX = Math.abs(touch.clientX - mouseDownPosition.current.x);
      const deltaY = Math.abs(touch.clientY - mouseDownPosition.current.y);
      const threshold = 5; // pixels

      // Only close if it's a tap (not a drag)
      if (deltaX < threshold && deltaY < threshold) {
        // prevent the event from reaching underlying elements on touch
        e.stopPropagation();
        // prevent default to stop synthetic mouse events in some browsers
        e.preventDefault();
        if (preventClose) {
          // Trigger shake animation
          setShouldShake(true);
          setTimeout(() => setShouldShake(false), 500);
          if (onCloseAttempt) {
            onCloseAttempt();
          }
        } else {
          onClose();
        }
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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (preventClose) {
          // Trigger shake animation
          setShouldShake(true);
          setTimeout(() => setShouldShake(false), 500);
          if (onCloseAttempt) {
            onCloseAttempt();
          }
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, preventClose, onCloseAttempt, onClose]);

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
                onClick={preventClose ? handleBackdropClick : undefined}
                onClickCapture={handleBackdropClickCapture}
              >
                {/* Modal Content */}
                <motion.div
                  ref={modalRef}
                  className={`bg-white shadow-2xl ${
                    isMobile ? 'w-full' : `w-full ${sizeClassMap[size]}`
                  } ${className} flex flex-col overflow-hidden ${
                    isMobile
                      ? 'rounded-t-2xl max-h-[90vh]'
                      : 'sm:rounded-lg rounded-t-2xl max-h-[90vh]'
                  } ${shouldShake ? 'modal-shake' : ''}`}
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
                className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center sm:justify-center p-0 sm:p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onMouseDown={handleBackdropMouseDown}
                onMouseUp={handleBackdropMouseUp}
                onTouchStart={handleBackdropTouchStart}
                onTouchEnd={handleBackdropTouchEnd}
                onClick={preventClose ? handleBackdropClick : undefined}
                onClickCapture={handleBackdropClickCapture}
              >
                {/* Modal Content */}
                <motion.div
                  ref={modalRef}
                  className={`bg-white shadow-2xl ${
                    isMobile ? 'w-full' : `w-full ${sizeClassMap[size]}`
                  } ${className} flex flex-col ${
                    isMobile
                      ? 'rounded-t-2xl max-h-[90vh]'
                      : 'rounded-lg max-h-[90vh]'
                  } ${shouldShake ? 'modal-shake' : ''}`}
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
              onClick={preventClose ? handleBackdropClick : undefined}
              onClickCapture={handleBackdropClickCapture}
            >
              {/* Modal Content */}
              <motion.div
                ref={modalRef}
                className={`bg-white shadow-2xl ${
                  isMobile ? 'w-full' : 'sm:w-auto sm:min-w-100 sm:max-w-125'
                } ${
                  sizeClassMap[size]
                } ${className} fixed sm:fixed bottom-0 sm:bottom-0 left-0 sm:left-auto right-0 sm:right-0 sm:top-0 ${
                  isMobile
                    ? 'rounded-t-2xl max-h-[90vh]'
                    : 'sm:h-screen max-h-[90vh] sm:max-h-none rounded-t-2xl sm:rounded-l-2xl sm:rounded-t-2xl'
                } flex flex-col overflow-hidden ${
                  shouldShake ? 'modal-shake' : ''
                }`}
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
};

export default Modal;
