'use client';

import { motion } from 'framer-motion';
import { type FC, type ReactNode } from 'react';

export interface ModalBackdropProps {
  children: ReactNode;
  className?: string;
  /** Show/hide backdrop */
  show: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Animation duration */
  duration?: number;
  /** Blur backdrop */
  blur?: boolean;
}

/**
 * ModalBackdrop - Standard backdrop animation for modals
 */
export const ModalBackdrop: FC<ModalBackdropProps> = ({
  children,
  className = 'fixed inset-0 bg-black/50 z-50',
  show,
  onClick,
  duration = 0.2,
  blur = false,
}) => {
  if (!show) return null;

  return (
    <motion.div
      className={`${className} ${blur ? 'backdrop-blur-sm' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
