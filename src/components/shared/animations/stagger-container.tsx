'use client';

import { motion, type Variants } from 'framer-motion';
import { type FC, type ReactNode } from 'react';

export interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  /** Animation trigger mode */
  mode?: 'animate' | 'whileInView';
  /** Viewport settings for whileInView mode */
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number;
  };
  /** Stagger delay between children */
  staggerChildren?: number;
  /** Delay before starting animation */
  delayChildren?: number;
  /** Exit animation support */
  exit?: boolean;
  /** Exit stagger direction (-1 for reverse) */
  exitStaggerDirection?: number;
  /** Custom variants override */
  variants?: Variants;
  /** Animation duration */
  duration?: number;
}

const defaultVariants = (
  staggerChildren: number,
  delayChildren: number,
  exit?: boolean,
  exitStaggerDirection?: number,
  duration?: number
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
      duration,
    },
  },
  ...(exit && {
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: staggerChildren * 0.6,
        staggerDirection: exitStaggerDirection ?? -1,
      },
    },
  }),
});

export const StaggerContainer: FC<StaggerContainerProps> = ({
  children,
  className,
  mode = 'whileInView',
  viewport = { once: true, margin: '-100px' },
  staggerChildren = 0.08,
  delayChildren = 0.1,
  exit = false,
  exitStaggerDirection = -1,
  variants,
  duration,
}) => {
  const containerVariants =
    variants ||
    defaultVariants(
      staggerChildren,
      delayChildren,
      exit,
      exitStaggerDirection,
      duration
    );

  if (mode === 'whileInView') {
    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      {...(exit && { exit: 'exit' })}
    >
      {children}
    </motion.div>
  );
};
