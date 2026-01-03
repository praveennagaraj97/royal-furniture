'use client';

import { motion, type Easing } from 'framer-motion';
import { type FC, type ReactNode } from 'react';

export interface FadeInProps {
  children: ReactNode;
  className?: string;
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
  /** Initial opacity */
  initialOpacity?: number;
}

export const FadeIn: FC<FadeInProps> = ({
  children,
  className,
  duration = 0.3,
  ease = 'easeOut',
  delay = 0,
  viewport = { once: true, margin: '-100px' },
  triggerOnView = true,
  exit = false,
  initialOpacity = 0,
}) => {
  const commonProps = {
    className,
    initial: { opacity: initialOpacity },
    animate: { opacity: 1 },
    exit: exit ? { opacity: initialOpacity } : undefined,
    transition: {
      duration,
      ease,
      delay,
    },
  };

  if (triggerOnView) {
    return (
      <motion.div
        {...commonProps}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
      >
        {children}
      </motion.div>
    );
  }

  return <motion.div {...commonProps}>{children}</motion.div>;
};
