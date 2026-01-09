'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { AppLink } from '@/hooks';
import { CategoryItem } from '@/types';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface CategoryNavProps {
  categories: CategoryItem[];
}

const CategoryNav: FC<CategoryNavProps> = ({ categories }) => {
  const pathName = usePathname();
  const t = useTranslations('header');

  return (
    <div className="shadow-md relative z-40">
      <nav className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 ">
        {/* Mobile: horizontal scroll, Desktop: centered wrap */}
        <StaggerContainer
          mode="animate"
          staggerChildren={0.05}
          delayChildren={0}
          duration={0.3}
          className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar sm:justify-center sm:flex-wrap py-3"
        >
          <AppLink
            href="/"
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors block hover:scale-105 active:scale-95 ${
              pathName === '/products'
                ? 'bg-deep-maroon text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('all')}
          </AppLink>

          {categories.map((category) => {
            return (
              <StaggerItem
                key={category.id}
                type="slide"
                direction="down"
                distance={10}
                duration={0.3}
                className="shrink-0"
              >
                <div className="relative">
                  <AppLink
                    href="/"
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors block hover:scale-105 active:scale-95 ${
                      pathName === category.slug
                        ? 'bg-deep-maroon text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </AppLink>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </nav>
    </div>
  );
};

export default CategoryNav;
