'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { Link } from '@/i18n/routing';
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
      <nav className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 ">
        {/* Mobile: horizontal scroll, Desktop: centered wrap */}
        <StaggerContainer
          mode="animate"
          staggerChildren={0.05}
          delayChildren={0}
          duration={0.3}
          className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar sm:justify-center sm:flex-wrap py-3"
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            const href = category.id === 'all' ? '/' : `/${category.id}`;

            return (
              <StaggerItem
                key={category.id}
                type="slide"
                direction="down"
                distance={10}
                duration={0.3}
                className="shrink-0"
              >
                <Link
                  href={href}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors block hover:scale-105 active:scale-95 ${
                    isSelected
                      ? 'bg-deep-maroon text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(category.key)}
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </nav>
    </div>
  );
};

export default CategoryNav;
