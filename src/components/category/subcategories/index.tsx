'use client';

import {
  StaggerContainer,
  StaggerItem,
  ViewOnce,
} from '@/components/shared/animations';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Swiper from '../../shared/swiper';
import SubCategoryCard, { Subcategory } from './card';

interface SubCategoriesProps {
  selectedCategoryId: string;
  selectedCategoryKey: string;
  subcategories: Subcategory[];
}

const SubCategories: FC<SubCategoriesProps> = ({
  selectedCategoryId,
  selectedCategoryKey,
  subcategories,
}) => {
  const t = useTranslations('categories');

  return (
    <StaggerContainer
      key={selectedCategoryId}
      mode="animate"
      staggerChildren={0.08}
      delayChildren={0.1}
      duration={0.3}
      className="overflow-hidden"
    >
      <div className="pt-4">
        <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3">
          <ViewOnce
            type="slideDown"
            distance={10}
            duration={0.3}
            delay={0.15}
            className="text-xl md:text-2xl font-semibold text-indigo-slate mb-4"
          >
            <h2>{selectedCategoryKey}</h2>
          </ViewOnce>
        </div>

        <div className="bg-soft-pink">
          <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 py-4">
            <Swiper className="px-0" gap={3} showNavigation hideArrowOnMobile>
              {subcategories.map((subcategory, index) => (
                <StaggerItem
                  key={subcategory.id}
                  type="slideScale"
                  direction="up"
                  distance={20}
                  initialScale={0.9}
                  duration={0.6}
                  className="min-w-[45%] sm:min-w-[35%] md:min-w-[25%] lg:min-w-[200px]"
                >
                  <SubCategoryCard subcategory={subcategory} index={index} />
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
