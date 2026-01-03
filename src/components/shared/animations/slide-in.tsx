'use client';

import { motion, type Easing } from 'framer-motion';
import { type FC, type ReactNode } from 'react';

export type SlideDirection = 'left' | 'right' | 'up' | 'down';
export type SlideOrigin = 'x' | 'y' | 'both';

export interface SlideInProps {
  children: ReactNode;
  className?: string;
  /** Slide direction */
  direction?: SlideDirection;
  /** Distance to slide from (in pixels or percentage) */
  distance?: number | string;
  /** Fade in with slide */
  fade?: boolean;
  /** Scale in with slide */
  scale?: boolean;
  /** Initial scale value */
  initialScale?: number;
  /** Animation duration */
  duration?: number;
  /** Animation easing */
  ease?: Easing | Easing[];
  /** Delay before animation starts */
  delay?: number;
  /** Trigger on viewport enter */
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number;
  };
  /** Use whileInView instead of animate */
  triggerOnView?: boolean;
  /** Exit animation */
  exit?: boolean;
  /** RTL-aware (automatically reverses for RTL) */
  rtlAware?: boolean;
}

export const SlideIn: FC<SlideInProps> = ({
  children,
  className,
  direction = 'up',
  distance = 30,
  fade = true,
  scale = false,
  initialScale = 1,
  duration = 0.6,
  ease = 'easeOut',
  delay = 0,
  viewport = { once: true, margin: '-100px' },
  triggerOnView = true,
  exit = false,
  rtlAware = false,
}) => {
  const isRTL =
    rtlAware &&
    (typeof document !== 'undefined'
      ? document.documentElement.dir === 'rtl'
      : false);

  const getInitialValues = () => {
    const initial: Record<string, string | number> = {};

    if (fade) initial.opacity = 0;
    if (scale) initial.scale = initialScale;

    if (direction === 'left') {
      initial.x = rtlAware && isRTL ? distance : `-${distance}`;
    } else if (direction === 'right') {
      initial.x = rtlAware && isRTL ? `-${distance}` : distance;
    } else if (direction === 'up') {
      initial.y = `-${distance}`;
    } else if (direction === 'down') {
      initial.y = distance;
    }

    return initial;
  };

  const getAnimateValues = () => {
    const animate: Record<string, string | number> = {};

    if (fade) animate.opacity = 1;
    if (scale) animate.scale = 1;
    animate.x = 0;
    animate.y = 0;

    return animate;
  };

  const getExitValues = () => {
    if (!exit) return undefined;
    return getInitialValues();
  };

  const transition = {
    duration,
    ease,
    delay,
  };

  const commonProps = {
    className,
    initial: getInitialValues(),
    animate: getAnimateValues(),
    exit: getExitValues(),
    transition,
  };

  if (triggerOnView) {
    return (
      <motion.div
        {...commonProps}
        whileInView={getAnimateValues()}
        viewport={viewport}
      >
        {children}
      </motion.div>
    );
  }

  return <motion.div {...commonProps}>{children}</motion.div>;
};
