'use client';

import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLocale } from 'next-intl';
import { FC, useState } from 'react';
import SupportLinks from './support-links';

export interface FooterCategory {
  id: string;
  title: string;
  links: string[];
}

interface MobileFooterLinksProps {
  categories: FooterCategory[];
}

const MobileFooterLinks: FC<MobileFooterLinksProps> = ({ categories }) => {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div className="flex flex-col gap-4 lg:hidden">
      {/* Support Links - Always visible */}
      <SupportLinks />

      {/* Accordion Categories */}
      {categories.map((category) => {
        const isOpen = openCategories.has(category.id);
        const ChevronIcon = isOpen ? ChevronUp : ChevronDown;

        return (
          <div
            key={category.id}
            className="border-b border-gray-300 last:border-b-0 pb-1.5 last:pb-0"
          >
            <button
              type="button"
              onClick={() => toggleCategory(category.id)}
              className="flex items-center justify-between w-full py-2 text-left group"
            >
              <h3 className="text-gray-900 font-bold text-base group-hover:text-deep-maroon transition-colors">
                {category.title}
              </h3>
              <ChevronIcon className="h-5 w-5 text-gray-600 transition-colors duration-200" />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  className="flex flex-col gap-1.5 mt-2 overflow-hidden"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {category.links.map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href="#"
                        className="text-gray-700 text-sm hover:text-deep-maroon transition-colors duration-200 block py-1"
                      >
                        {link}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default MobileFooterLinks;
