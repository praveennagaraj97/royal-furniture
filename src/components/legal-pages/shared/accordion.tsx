'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, type FC, type ReactNode } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export interface LegalAccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

interface LegalAccordionProps {
  items: LegalAccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

const LegalAccordion: FC<LegalAccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(items.filter((item) => item.defaultOpen).map((item) => item.id)),
  );

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => {
      if (allowMultiple) {
        const nextOpenItems = new Set(prev);

        if (nextOpenItems.has(itemId)) {
          nextOpenItems.delete(itemId);
        } else {
          nextOpenItems.add(itemId);
        }

        return nextOpenItems;
      }

      return prev.has(itemId) ? new Set<string>() : new Set([itemId]);
    });
  };

  return (
    <StaggerContainer
      staggerChildren={0.08}
      delayChildren={0.08}
      duration={0.3}
      className={className}
    >
      {items.map((item, index) => {
        const isOpen = openItems.has(item.id);
        const isLast = index === items.length - 1;

        return (
          <StaggerItem
            key={item.id}
            type="slideUp"
            distance={14}
            duration={0.3}
            className={`overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-[0_8px_30px_rgba(15,28,44,0.05)] ${
              isOpen ? 'ring-1 ring-deep-maroon/10' : ''
            } ${!isLast ? 'mb-4' : ''}`.trim()}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
            >
              <span className="text-base sm:text-lg font-medium text-indigo-slate pr-4">
                {item.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-soft-pink text-deep-maroon"
              >
                <FiChevronDown className="h-5 w-5" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 pt-0 text-sm sm:text-base leading-7 text-slate-600 sm:px-7">
                    {item.content}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
};

export default LegalAccordion;
