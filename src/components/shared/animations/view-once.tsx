'use client';

import { motion, type Easing } from 'framer-motion';
import { type FC, type ReactNode } from 'react';

export type ViewOnceAnimationType =
  | 'fade'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'scaleUp';

export interface ViewOnceProps {
  children: ReactNode;
  className?: string;
  /** Unique ID for tracking view state (from parent) */
  id?: string;
  /** Animation type */
  type?: ViewOnceAnimationType;
  /** Distance for slide animations */
  distance?: number;
  /** Initial scale for scale animations */
  initialScale?: number;
  /** Animation duration */
  duration?: number;
  /** Animation easing */
  ease?: Easing | Easing[];
  /** Delay before animation starts */
  delay?: number;
  /** Viewport margin */
  margin?: string;
  /** Viewport amount (0-1) */
  amount?: number;
  /** RTL-aware (for slideLeft/slideRight) */
  rtlAware?: boolean;
}

const getInitialValues = (
  type: ViewOnceAnimationType,
  distance: number,
  initialScale: number,
  rtlAware: boolean,
) => {
  const isRTL =
    rtlAware &&
    (typeof document !== 'undefined'
      ? document.documentElement.dir === 'rtl'
      : false);

  switch (type) {
    case 'fade':
      return { opacity: 0 };
    case 'slideUp':
      return { opacity: 0, y: distance };
    case 'slideDown':
      return { opacity: 0, y: -distance };
    case 'slideLeft':
      return { opacity: 0, x: isRTL ? distance : -distance };
    case 'slideRight':
      return { opacity: 0, x: isRTL ? -distance : distance };
    case 'scale':
      return { opacity: 0, scale: initialScale };
    case 'scaleUp':
      return { opacity: 0, scale: initialScale, y: distance };
    default:
      return { opacity: 0 };
  }
};

const getAnimateValues = () => ({
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
});

export const ViewOnce: FC<ViewOnceProps> = ({
  children,
  className,
  id,
  type = 'fade',
  distance = 30,
  initialScale = 0.95,
  duration = 0.6,
  ease = 'easeOut',
  delay = 0,
  margin = '-40px',
  amount,
  rtlAware = false,
}) => {
  return (
    <motion.div
      className={className}
      initial={getInitialValues(type, distance, initialScale, rtlAware)}
      whileInView={getAnimateValues()}
      viewport={{
        once: true,
        margin,
        ...(amount !== undefined && { amount }),
      }}
      transition={{
        duration,
        ease,
        delay,
      }}
      {...(id && { 'data-view-once-id': id })}
    >
      {children}
    </motion.div>
  );
};
