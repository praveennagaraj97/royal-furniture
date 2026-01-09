'use client';

import { useAppRouter } from '@/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';
import {
  FiArrowLeft,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

import { useLayoutData } from '@/contexts/layout-context';

interface CategoriesSectionProps {
  selectedCategory: string | null;
  onCategoryClick: (categoryId: string) => void;
  onBackClick: () => void;
  onClose: () => void;
}

export const CategoriesSection: FC<CategoriesSectionProps> = ({
  selectedCategory,
  onCategoryClick,
  onBackClick,
  onClose,
}) => {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useAppRouter();
  const isRTL = locale === 'ar';

  const { categories } = useLayoutData();

  // Animation values based on RTL
  const slideInX = isRTL ? -20 : 20;
  const slideOutX = isRTL ? 20 : -20;
  const categoriesSlideInX = isRTL ? 20 : -20;
  const categoriesSlideOutX = isRTL ? -20 : 20;

  return (
    <AnimatePresence mode="wait">
      {selectedCategory ? (
        <motion.div
          key={`subcategories-${selectedCategory}`}
          className="flex flex-col"
          initial={{ opacity: 0, x: slideInX }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: slideOutX }}
          transition={{ duration: 0.2 }}
        >
          {/* Back Button */}
          <button
            className="flex items-center gap-3 w-full px-1 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-200 mb-2"
            type="button"
            onClick={onBackClick}
          >
            {isRTL ? (
              <FiArrowRight className="h-5 w-5" />
            ) : (
              <FiArrowLeft className="h-5 w-5" />
            )}
            <span className="text-base font-medium">
              {categories.find((c) => c.slug === selectedCategory)?.name ||
                t('back')}
            </span>
          </button>

          {/* Subcategories */}
          {(() => {
            const selectedCategoryData = categories.find(
              (c) => c.slug === selectedCategory
            );
            const subcategories = selectedCategoryData?.subCategories || [];

            if (subcategories.length === 0) {
              return null;
            }

            return subcategories.map((subcategory) => (
              <button
                key={subcategory.id}
                className="flex items-center gap-3 w-full px-1 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-[#7F1D1D] transition-colors border-b border-gray-200"
                type="button"
                onClick={() => {
                  if (subcategory.slug) {
                    router.push(`/${selectedCategory}/${subcategory.slug}`);
                  } else {
                    router.push(
                      `/${selectedCategory}?subcategory=${subcategory.id}`
                    );
                  }
                  onClose();
                }}
              >
                <span className="text-base font-medium">
                  {subcategory.name}
                </span>
              </button>
            ));
          })()}
        </motion.div>
      ) : (
        <motion.div
          key="categories"
          className="flex flex-col gap-1 mb-4"
          initial={{ opacity: 0, x: categoriesSlideInX }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: categoriesSlideOutX }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-sm font-semibold text-gray-500 uppercase mb-2">
            {t('categories')}
          </div>
          {categories.map((category) => {
            const hasSubcategories =
              category.subCategories && category.subCategories.length > 0;
            return (
              <button
                key={category.id}
                className="flex items-center justify-between gap-3 w-full px-1 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-[#7F1D1D] rounded-xl transition-colors"
                type="button"
                onClick={() => {
                  if (hasSubcategories) {
                    onCategoryClick(category.slug);
                  } else {
                    router.push(`/${category.slug}`);
                    onClose();
                  }
                }}
              >
                <span className="text-base font-medium">{category.name}</span>
                {hasSubcategories &&
                  (isRTL ? (
                    <FiChevronLeft className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FiChevronRight className="h-5 w-5 text-gray-400" />
                  ))}
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
