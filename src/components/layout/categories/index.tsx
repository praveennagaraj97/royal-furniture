'use client';

import { CategoryItem } from '@/types';
import { forwardRef } from 'react';
import CategoryNav from './category-nav';

interface CategoriesProps {
  categories: CategoryItem[];
}

const Categories = forwardRef<HTMLElement, CategoriesProps>(
  ({ categories }, ref) => {
    return (
      <section ref={ref} className="w-full relative z-40">
        <CategoryNav categories={categories} />
      </section>
    );
  }
);

Categories.displayName = 'Categories';

export default Categories;
