'use client';

import { usePathname } from '@/i18n/routing';
import { forwardRef, useMemo } from 'react';
import CategoryNav, { Category } from './category-nav';

interface CategoriesData {
  [key: string]: unknown[];
}

interface CategoriesProps {
  categories: Category[];
  categoriesData: CategoriesData;
}

const Categories = forwardRef<HTMLElement, CategoriesProps>(
  ({ categories }, ref) => {
    const pathname = usePathname();

    // Determine selected category from pathname
    const selectedCategory = useMemo(() => {
      // Remove leading and trailing slashes, then get the last segment
      const pathSegments = pathname.split('/').filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1];

      // Check if the last segment matches any category id
      const category = categories.find((cat) => cat.id === lastSegment);
      return category ? category.id : 'all';
    }, [pathname, categories]);

    return (
      <section ref={ref} className="w-full relative z-40">
        <CategoryNav
          categories={categories}
          selectedCategory={selectedCategory}
        />
      </section>
    );
  }
);

Categories.displayName = 'Categories';

export default Categories;
