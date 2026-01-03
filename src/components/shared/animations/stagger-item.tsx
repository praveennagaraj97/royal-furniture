'use client';

import { motion, type Easing, type Variants } from 'framer-motion';
import { type FC, type ReactNode } from 'react';

export type SlideDirection = 'left' | 'right' | 'up' | 'down' | 'none';
export type AnimationType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'slideScale'
  | 'slideUp';

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  /** Animation type */
  type?: AnimationType;
  /** Slide direction (for slide animations) */
  direction?: SlideDirection;
  /** Distance to slide (in pixels or percentage) */
  distance?: number | string;
  /** Initial scale (for scale animations) */
  initialScale?: number;
  /** Animation duration */
  duration?: number;
  /** Animation easing */
  ease?: Easing | Easing[];
  /** Exit animation support */
  exit?: boolean;
  /** RTL-aware animation (automatically reverses direction for RTL) */
  rtlAware?: boolean;
  /** Custom variants override */
  variants?: Variants;
  /** Mouse enter handler */
  onMouseEnter?: () => void;
  /** Mouse leave handler */
  onMouseLeave?: () => void;
}

const createVariants = (
  type: AnimationType,
  direction: SlideDirection,
  distance: number | string,
  initialScale: number,
  duration: number,
  ease: Easing | Easing[],
  exit: boolean,
  rtlAware: boolean,
  isRTL: boolean
): Variants => {
  const getXValue = () => {
    if (direction === 'left')
      return rtlAware && isRTL ? distance : `-${distance}`;
    if (direction === 'right')
      return rtlAware && isRTL ? `-${distance}` : distance;
    return 0;
  };

  const getYValue = () => {
    if (direction === 'up') return `-${distance}`;
    if (direction === 'down') return distance;
    return 0;
  };

  const hidden: Record<string, string | number> = { opacity: 0 };
  const visible: Record<string, string | number> = { opacity: 1 };

  if (type === 'fade') {
    // Only opacity
  } else if (type === 'slide') {
    if (direction === 'left' || direction === 'right') {
      hidden.x = getXValue();
      visible.x = 0;
    } else if (direction === 'up' || direction === 'down') {
      hidden.y = getYValue();
      visible.y = 0;
    }
  } else if (type === 'scale') {
    hidden.scale = initialScale;
    visible.scale = 1;
  } else if (type === 'slideScale') {
    hidden.x = getXValue();
    hidden.y = getYValue();
    hidden.scale = initialScale;
    visible.x = 0;
    visible.y = 0;
    visible.scale = 1;
  } else if (type === 'slideUp') {
    hidden.y = typeof distance === 'number' ? distance : 20;
    hidden.scale = initialScale;
    visible.y = 0;
    visible.scale = 1;
  }

  const transition = {
    duration,
    ease,
  };

  return {
    hidden,
    visible: {
      ...visible,
      transition,
    },
    ...(exit && {
      exit: {
        ...hidden,
        transition: {
          duration: duration * 0.6,
          ease,
        },
      },
    }),
  };
};

export const StaggerItem: FC<StaggerItemProps> = ({
  children,
  className,
  type = 'slide',
  direction = 'left',
  distance = 20,
  initialScale = 0.9,
  duration = 0.4,
  ease = 'easeOut',
  exit = false,
  rtlAware = false,
  variants,
  onMouseEnter,
  onMouseLeave,
}) => {
  // Detect RTL from document or parent
  const isRTL =
    rtlAware &&
    (typeof document !== 'undefined'
      ? document.documentElement.dir === 'rtl'
      : false);

  const itemVariants =
    variants ||
    createVariants(
      type,
      direction,
      distance,
      initialScale,
      duration,
      ease,
      exit,
      rtlAware,
      isRTL
    );

  return (
    <motion.div
      className={className}
      variants={itemVariants}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...(exit && { exit: 'exit' })}
    >
      {children}
    </motion.div>
  );
};
