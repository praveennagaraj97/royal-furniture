'use client';

import {
  StaggerContainer,
  StaggerItem,
  ViewOnce,
} from '@/components/shared/animations';
import { useLayoutData } from '@/contexts/layout-context';
import { useAppPathName } from '@/hooks';
import { useParams } from 'next/navigation';
import { FC } from 'react';
import Swiper from '../../shared/swiper';
import SubCategoryCard from './card';

const SubCategories: FC = () => {
  const { categories } = useLayoutData();
  const pathName = useAppPathName();

  const params = useParams();
  const { subcategory: activeSubcategory, product } = params;

  // Don't show subcategories on product detail pages
  if (product) return null;

  const selectedCategory = categories.find(
    (category) => category.slug === pathName.split('/')[1],
  );

  if (!selectedCategory || !selectedCategory.subCategories) return null;

  const subcategories = selectedCategory.subCategories;

  return (
    <StaggerContainer
      mode="animate"
      staggerChildren={0.08}
      delayChildren={0.1}
      duration={0.3}
      className="overflow-hidden"
    >
      <div>
        <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3">
          <ViewOnce
            type="slideDown"
            distance={10}
            duration={0.3}
            delay={0.15}
            className="text-xl md:text-2xl font-semibold text-indigo-slate"
          >
            <h2>{selectedCategory.name}</h2>
          </ViewOnce>
        </div>

        <div className="">
          <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 py-4">
            <Swiper className="px-0" gap={3} showNavigation hideArrowOnMobile>
              {subcategories.map((subcategory) => (
                <StaggerItem
                  key={subcategory.id}
                  type="slideScale"
                  direction="up"
                  distance={20}
                  initialScale={0.9}
                  duration={0.6}
                  className="min-w-40 sm:min-w-48 md:min-w-56 lg:min-w-64 xl:min-w-80 aspect-[10/9]"
                >
                  <SubCategoryCard
                    subcategory={subcategory}
                    categorySlug={selectedCategory.slug}
                    isActive={activeSubcategory === subcategory.slug}
                  />
                </StaggerItem>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </StaggerContainer>
  );
};

export default SubCategories;
