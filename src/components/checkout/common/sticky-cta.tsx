'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';

interface StickyCtaProps {
  show: boolean;
  label: string;
  Icon?: FC<{ className?: string }>;
  onClick: () => void;
  id?: string;
}

export const StickyCta: FC<StickyCtaProps> = ({
  show,
  label,
  Icon,
  onClick,
  id,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={id ?? label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="sm:hidden fixed inset-x-0 bottom-0 z-40 bg-white border-t border-gray-200 px-4 py-2.5 shadow-sm"
        >
          <button
            type="button"
            onClick={onClick}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-deep-maroon text-white py-3 text-sm font-medium hover:bg-[#6b0000] transition-colors duration-200 shadow-md"
            aria-label={label}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{label}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCta;
