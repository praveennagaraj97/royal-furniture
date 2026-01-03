'use client';

import { AnimatePresence, motion, type Easing } from 'framer-motion';
import { type FC, type ReactNode } from 'react';

export type PresenceMode = 'wait' | 'sync' | 'popLayout';

export interface AnimatePresenceWrapperProps {
  children: ReactNode;
  /** Show/hide based on this condition */
  show: boolean;
  /** AnimatePresence mode */
  mode?: PresenceMode;
  /** Initial animation (false = no initial animation) */
  initial?: boolean;
  /** Custom exit animation */
  exitAnimation?: Record<string, string | number>;
  /** Custom enter animation */
  enterAnimation?: Record<string, string | number>;
  /** Animation duration */
  duration?: number;
  /** Animation easing */
  ease?: Easing | Easing[];
  /** Custom key for AnimatePresence */
  key?: string;
}

export const AnimatePresenceWrapper: FC<AnimatePresenceWrapperProps> = ({
  children,
  show,
  mode = 'wait',
  initial = true,
  exitAnimation,
  enterAnimation,
  duration = 0.3,
  ease = 'easeOut',
  key,
}) => {
  const defaultExit = exitAnimation || { opacity: 0 };
  const defaultEnter = enterAnimation || { opacity: 1 };

  return (
    <AnimatePresence mode={mode} initial={initial}>
      {show && (
        <motion.div
          key={key}
          initial={defaultExit}
          animate={defaultEnter}
          exit={defaultExit}
          transition={{ duration, ease }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
