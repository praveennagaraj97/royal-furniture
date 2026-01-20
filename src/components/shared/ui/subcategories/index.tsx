'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import Swiper from '@/components/shared/swiper';
import { AppLink } from '@/hooks';
import { SubCategoryItem } from '@/types';
import Image from 'next/image';
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
      <div className="relative w-full aspect-[5/6] rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition-all duration-300">
        <AppLink href={`/${item.category_slug}/${item.slug}`}>
          <Image
            src={item.image || ''}
            alt={item.name || ''}
            fill
            className="object-cover transition-transform duration-300"
            sizes="(max-width: 640px) 200px, (max-width: 768px) 220px, (max-width: 1024px) 240px, 260px"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
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
