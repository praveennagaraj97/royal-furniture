'use client';

import { SlideIn } from '@/components/shared/animations';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface Props {
  title: string;
  content: string;
}

const AccordionItem: FC<Props> = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <SlideIn direction="up">
      <div className="bg-white border border-[#e3e2e1] overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center p-5 md:p-8 text-left"
        >
          <span className="text-base md:text-lg text-[#1a1c1c]">{title}</span>

          {/* Icon */}
          <motion.span
            animate={{
              rotate: open ? 180 : 0,
              scale: open ? 1.05 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            className="flex items-center justify-center text-[var(--color-deep-maroon)]"
          >
            <FiChevronDown size={20} />
          </motion.span>
        </button>

        {/* Content */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: {
                  duration: 0.35,
                  ease: [0.25, 0.8, 0.25, 1],
                },
                opacity: { duration: 0.25 },
              }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-8 pb-6 text-sm md:text-base text-[#44474c] leading-relaxed">
                {content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideIn>
  );
};

export default AccordionItem;
