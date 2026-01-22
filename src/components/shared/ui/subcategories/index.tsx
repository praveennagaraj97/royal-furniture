'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import Swiper from '@/components/shared/swiper';
import ResponsiveImage from '@/components/shared/ui/responsive-image';
import { AppLink } from '@/hooks';
import { SubCategoryItem } from '@/types';
import { FC, useState } from 'react';

interface SubCategoriesSwiperProps {
  items: SubCategoryItem[];
}

const SubCategoriesSwiper: FC<SubCategoriesSwiperProps> = ({ items }) => {
  return (
    <StaggerContainer
      staggerChildren={0.15}
      delayChildren={0.1}
      className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 overflow-hidden md:overflow-visible"
    >
      <Swiper gap={4} showNavigation hideArrowOnMobile>
        {items.map((item) => (
          <SpotLightCard key={item.id} item={item} />
        ))}
      </Swiper>
    </StaggerContainer>
  );
};

const SpotLightCard: FC<{ item: SubCategoryItem }> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StaggerItem
      type="slideUp"
      distance={30}
      duration={0.6}
      className="flex flex-col min-w-40 sm:min-w-48 md:min-w-56 lg:min-w-64 xl:min-w-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image Container */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition-all duration-300">
        <AppLink href={`/${item.category_slug}/${item.slug}`}>
          <ResponsiveImage
            images={item.responsive_images}
            alt={item.name || ''}
            className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
        </AppLink>
      </div>

      {/* Label Text Below Card */}
      <div className="mt-2 text-center">
        <h3 className="text-black text-base sm:text-lg font-semibold">
          {item.name || ''}
        </h3>
      </div>
    </StaggerItem>
  );
};

export default SubCategoriesSwiper;
