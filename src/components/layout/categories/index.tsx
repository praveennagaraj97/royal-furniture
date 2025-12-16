'use client';

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
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories.find((cat) => cat.id === 'sofa')?.id || categories[0]?.id || ''
  );

  const selectedCategoryObj = categories.find(
    (cat) => cat.id === selectedCategory
  );

  const subcategories =
    selectedCategoryObj &&
    selectedCategory !== 'all' &&
    categoriesData[selectedCategory]
      ? categoriesData[selectedCategory]
      : [];

  return (
    <section className="w-full ">
      <CategoryNav
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      {selectedCategoryObj && selectedCategory !== 'all' && (
        <CategoryDetail
          selectedCategoryId={selectedCategory}
          selectedCategoryKey={selectedCategoryObj.key}
          subcategories={subcategories}
        />
      )}
    </section>
  );
};

export default Categories;
