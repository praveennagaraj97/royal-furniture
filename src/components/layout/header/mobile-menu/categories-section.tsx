'use client';

import { Subcategory } from '@/components/category/subcategories/card';
import { useRouter } from '@/i18n/routing';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';

import { categories } from '@/temp/data/categories';
import { categoriesData, CategoriesData } from '@/temp/data/categories-data';

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
  const tCategories = useTranslations('categories');
  const locale = useLocale();
  const router = useRouter();
  const isRTL = locale === 'ar';

  const getSubcategories = (): Subcategory[] => {
    if (!selectedCategory) return [];
    return categoriesData[selectedCategory as keyof CategoriesData] || [];
  };

  const subcategories = getSubcategories();

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
              <ArrowRight className="h-5 w-5" />
            ) : (
              <ArrowLeft className="h-5 w-5" />
            )}
            <span className="text-base font-medium">
              {categories.find((c) => c.id === selectedCategory)
                ? tCategories(
                    categories.find((c) => c.id === selectedCategory)?.key || ''
                  )
                : t('back')}
            </span>
          </button>

          {/* Subcategories */}
          {subcategories.map((subcategory) => (
            <button
              key={subcategory.id}
              className="flex items-center gap-3 w-full px-1 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-[#7F1D1D] transition-colors border-b border-gray-200"
              type="button"
              onClick={() => {
                router.push(`/${selectedCategory}/${subcategory.id}`);
                onClose();
              }}
            >
              <span className="text-base font-medium">
                {subcategory.name}
              </span>
            </button>
          ))}
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
          {categories
            .filter((cat) => cat.id !== 'all')
            .map((category) => {
              const hasSubcategories =
                categoriesData[category.id as keyof CategoriesData] &&
                categoriesData[category.id as keyof CategoriesData].length > 0;
              return (
                <button
                  key={category.id}
                  className="flex items-center justify-between gap-3 w-full px-1 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-[#7F1D1D] rounded-xl transition-colors"
                  type="button"
                  onClick={() => {
                    if (hasSubcategories) {
                      onCategoryClick(category.id);
                    } else {
                      router.push(`/${category.id}`);
                      onClose();
                    }
                  }}
                >
                  <span className="text-base font-medium">
                    {tCategories(category.key)}
                  </span>
                  {hasSubcategories &&
                    (isRTL ? (
                      <ChevronLeft className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    ))}
                </button>
              );
            })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

