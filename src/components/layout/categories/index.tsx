'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { Subcategory } from './category-card';
import CategoryDetail from './category-detail';
import CategoryNav, { Category } from './category-nav';

interface CategoriesData {
  [key: string]: Subcategory[];
}

interface CategoriesProps {
  categories: Category[];
  categoriesData: CategoriesData;
}

const Categories: FC<CategoriesProps> = ({ categories, categoriesData }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const selectedCategoryObj = categories.find(
    (cat) => cat.id === selectedCategory
  );

  const subcategories =
    selectedCategoryObj &&
    selectedCategory !== 'all' &&
    categoriesData[selectedCategory]
      ? categoriesData[selectedCategory]
      : [];

  const shouldShowDetail =
    selectedCategoryObj &&
    selectedCategory !== 'all' &&
    subcategories.length > 0;

  return (
    <section className="w-full">
      <CategoryNav
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <AnimatePresence mode="wait">
        {shouldShowDetail && (
          <motion.div
            key={selectedCategory}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.3, ease: 'easeOut' },
            }}
            className="overflow-hidden"
          >
            <CategoryDetail
              selectedCategoryId={selectedCategory}
              selectedCategoryKey={selectedCategoryObj.key}
              subcategories={subcategories}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Categories;
