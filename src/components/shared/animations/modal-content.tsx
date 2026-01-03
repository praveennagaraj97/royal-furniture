'use client';

import { motion, type Easing } from 'framer-motion';
import { type FC, type ReactNode } from 'react';

export type ModalVariant = 'bottom' | 'center';

export interface ModalContentProps {
  children: ReactNode;
  className?: string;
  /** Modal variant */
  variant?: ModalVariant;
  /** Is mobile device */
  isMobile?: boolean;
  /** Animation duration */
  duration?: number;
  /** Animation easing */
  ease?: Easing | Easing[];
}

/**
 * ModalContent - Standard content animation for modals
 */
export const ModalContent: FC<ModalContentProps> = ({
  children,
  className,
  variant = 'bottom',
  isMobile = false,
  duration = 0.3,
  ease = 'easeOut',
}) => {
  const getInitialValues = () => {
    if (variant === 'bottom') {
      return isMobile
        ? { opacity: 0, y: '100%' }
        : { opacity: 0, scale: 0.95, y: 20 };
    }
    // center variant
    return { opacity: 0, scale: 0.95 };
  };

  const getAnimateValues = () => {
    if (variant === 'bottom') {
      return isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 };
    }
    // center variant
    return { opacity: 1, scale: 1 };
  };

  const getExitValues = () => {
    return getInitialValues();
  };

  return (
    <motion.div
      className={className}
      initial={getInitialValues()}
      animate={getAnimateValues()}
      exit={getExitValues()}
      transition={{ duration, ease }}
    >
      {children}
    </motion.div>
  );
};
