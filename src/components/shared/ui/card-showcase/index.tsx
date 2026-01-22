'use client';

import { StaggerContainer } from '@/components/shared/animations';
import Swiper from '@/components/shared/swiper';
import { ResponsiveImages } from '@/types/response';
import { FC } from 'react';
import CardShowcaseCard from './card';

export interface CardItem {
  id: string;
  responsive_images?: ResponsiveImages;
  imageAlt?: string;
  label: string;
}

export interface CardShowcaseProps {
  items: CardItem[];
  className?: string;
}

const CardShowcase: FC<CardShowcaseProps> = ({ items, className = '' }) => {
  return (
    <StaggerContainer
      staggerChildren={0.15}
      delayChildren={0.1}
      className={`container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 overflow-hidden md:overflow-visible ${className}`}
    >
      <Swiper gap={4} showNavigation hideArrowOnMobile>
        {items.map((item) => (
          <CardShowcaseCard
            key={item.id}
            images={item.responsive_images}
            alt={item.imageAlt}
            label={item.label}
          />
        ))}
      </Swiper>
    </StaggerContainer>
  );
};

export default CardShowcase;
