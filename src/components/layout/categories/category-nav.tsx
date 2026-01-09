'use client';

import { StaggerItem } from '@/components/shared/animations';
import { AppLink, useAppPathName } from '@/hooks';
import { CategoryWithSubCategories } from '@/types';
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
  const pathName = useAppPathName();

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
            setActiveCategory(category.slug);
          }}
        >
          <AppLink
            href={`/${category.slug}`}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors block hover:scale-105 active:scale-95 ${
              pathName === category.slug
                ? 'bg-deep-maroon text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </AppLink>
        </div>
        {category.subCategories?.length ? (
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
