'use client';

import { motion } from 'framer-motion';
import { type FC, type ReactNode } from 'react';

export interface RotateIconProps {
  children: ReactNode;
  className?: string;
  /** Show state (determines rotation) */
  show: boolean;
  /** Rotation angle when shown */
  showRotation?: number;
  /** Rotation angle when hidden */
  hideRotation?: number;
  /** Animation duration */
  duration?: number;
}

/**
 * RotateIcon - Rotates icon between two states (e.g., menu/close icon)
 */
export const RotateIcon: FC<RotateIconProps> = ({
  children,
  className,
  show,
  showRotation = 0,
  hideRotation = -90,
  duration = 0.2,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ rotate: hideRotation, opacity: 0 }}
      animate={{
        rotate: show ? showRotation : hideRotation,
        opacity: 1,
      }}
      exit={{
        rotate: show ? showRotation + 90 : hideRotation - 90,
        opacity: 0,
      }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  );
};
