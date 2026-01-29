'use client';

import { motion, type Easing } from 'framer-motion';
import { type FC, type ReactNode } from 'react';

export interface HeroBannerProps {
  children: ReactNode;
  className?: string;
  /** Animation duration */
  duration?: number;
  /** Animation easing */
  ease?: Easing | Easing[];
  /** Viewport margin */
  margin?: string;
}

/**
 * HeroBanner - Standard animation for hero/banner sections
 * Animates with fade, scale, and slide up effect
 */
export const HeroBanner: FC<HeroBannerProps> = ({
  children,
  className,
  duration = 0.8,
  ease = 'easeOut',
  margin = '-40px',
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 1.05, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration, ease }}
    >
      {children}
    </motion.div>
  );
};
