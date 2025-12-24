'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export interface Category {
  id: string;
  key: string;
}

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
}

const CategoryNav: FC<CategoryNavProps> = ({
  categories,
  selectedCategory,
}) => {
  const t = useTranslations('categories');

  return (
    <div className="shadow-md">
      <nav className="container mx-auto px-3 ">
        {/* Mobile: horizontal scroll, Desktop: centered wrap */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar sm:justify-center sm:flex-wrap py-3">
          {categories.map((category, index) => {
            const isSelected = selectedCategory === category.id;
            const href = category.id === 'all' ? '/' : `/${category.id}`;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={href}
                  className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors block ${
                    isSelected
                      ? 'bg-deep-maroon text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(category.key)}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default CategoryNav;
