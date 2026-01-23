'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { AppLink, useAppPathName } from '@/hooks';
import { CategoryWithSubCategories } from '@/types';
import { useTranslations } from 'next-intl';
import { forwardRef, useState } from 'react';
import CategoryNav from './category-nav';

interface CategoriesProps {
  categories: CategoryWithSubCategories[];
}

const Categories = forwardRef<HTMLElement, CategoriesProps>(
  ({ categories }, ref) => {
    const pathName = useAppPathName();
    const t = useTranslations('header');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const isHome = pathName === '/';

    if (!categories || categories.length === 0) return null;

    return (
      <section
        ref={ref}
        className={`w-full relative z-40 ${!isHome ? 'hidden lg:block' : ''}`}
      >
        <div className="shadow-md relative z-40">
          <nav className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 max-w-5xl flex justify-center relative">
            {/* Mobile: horizontal scroll, Desktop: centered wrap */}
            <StaggerContainer
              mode="animate"
              staggerChildren={0.05}
              delayChildren={0}
              duration={0.3}
              className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-3 px-1"
            >
              <StaggerItem
                type="slide"
                direction="down"
                distance={10}
                duration={0.3}
                className="shrink-0"
              >
                <AppLink
                  href="/"
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors block hover:scale-105 active:scale-95 ${
                    pathName === '/'
                      ? 'bg-deep-maroon text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t('all')}
                </AppLink>
              </StaggerItem>

              {categories.map((category) => {
                return (
                  <CategoryNav
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    category={category}
                    key={category.id}
                  />
                );
              })}
            </StaggerContainer>
          </nav>
        </div>
      </section>
    );
  },
);

Categories.displayName = 'Categories';

export default Categories;
