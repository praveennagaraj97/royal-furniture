'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import Swiper from '@/components/shared/swiper';
import { SubCategoryItem } from '@/types';
import Image from 'next/image';
import { FC, useState } from 'react';

interface SpotLightShowcaseProps {
  items: SubCategoryItem[];
}

const SpotLightShowcase: FC<SpotLightShowcaseProps> = ({ items }) => {
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
      className="flex flex-col w-full min-w-[200px] sm:min-w-[220px] md:min-w-[240px] lg:min-w-[260px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image Container */}
      <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition-all duration-300">
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
      </div>

      {/* Label Text Below Card */}
      <div className="mt-3 text-center">
        <h3 className="text-black text-lg sm:text-xl font-semibold">
          {item.name || ''}
        </h3>
      </div>
    </StaggerItem>
  );
};

export default SpotLightShowcase;
