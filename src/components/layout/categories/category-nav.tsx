'use client';

import { StaggerItem } from '@/components/shared/animations';
import { AppLink } from '@/hooks';
import { CategoryWithSubCategories } from '@/types';
import { useParams } from 'next/navigation';
import { Dispatch, FC, Fragment, SetStateAction } from 'react';
import CategoryDropdown from './category-dropdown';

interface CategoryNavProps {
  category: CategoryWithSubCategories;

  setActiveCategory: Dispatch<SetStateAction<string | null>>;
  activeCategory: string | null;
}

const CategoryNav: FC<CategoryNavProps> = ({
  category,
  activeCategory,
  setActiveCategory,
}) => {
  const { category: currentCategory } = useParams();

  // Don't show dropdown if user is on the same category page
  const shouldShowDropdown = currentCategory !== category.slug;

  return (
    <Fragment>
      <StaggerItem
        key={category.id}
        type="slide"
        direction="down"
        distance={10}
        duration={0.3}
        className="shrink-0"
      >
        <div
          className="relative"
          onMouseEnter={() => {
            // Don't open dropdown if user is on the same category page
            if (shouldShowDropdown) {
              setActiveCategory(category.slug);
            }
          }}
        >
          <AppLink
            href={`/${category.slug}`}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors block hover:scale-105 active:scale-95 ${
              currentCategory === category.slug
                ? 'bg-deep-maroon text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </AppLink>
        </div>
        {category.subCategories?.length && shouldShowDropdown ? (
          <div onMouseLeave={() => setActiveCategory(null)}>
            <CategoryDropdown
              isOpen={activeCategory === category.slug}
              categoryName={category.name}
              categorySlug={category.slug}
              subcategories={category.subCategories}
            />
          </div>
        ) : null}
      </StaggerItem>
    </Fragment>
  );
};

export default CategoryNav;
