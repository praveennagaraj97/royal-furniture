'use client';

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
  onCategorySelect: (categoryId: string) => void;
}

const CategoryNav: FC<CategoryNavProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  const t = useTranslations('categories');

  return (
    <div className="shadow-md">
      <nav className="container mx-auto py-3">
        <div className="flex items-center gap-3 flex-wrap">
          {categories.map((category, index) => {
            const isSelected = selectedCategory === category.id;
            return (
              <motion.button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-deep-maroon text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
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
                {t(category.key)}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default CategoryNav;
