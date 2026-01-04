'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, type FC, type ReactNode } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export interface AccordionItemProps {
  id: string;
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(items.filter((item) => item.defaultOpen).map((item) => item.id))
  );

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => {
      const newSet = allowMultiple ? new Set(prev) : new Set<string>();
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <StaggerContainer
      staggerChildren={0.08}
      delayChildren={0.1}
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
            distance={10}
            duration={0.3}
            className={!isLast ? 'border-b border-gray-200' : ''}
          >
            <div>
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="flex items-center justify-between w-full py-2.5 text-left"
              >
                <h3 className="text-gray-900 font-bold text-sm">
                  {item.title}
                </h3>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  <FiChevronDown className="h-4 w-4 text-gray-700" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-0">{item.children}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
};
