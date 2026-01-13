'use client';

import { StaggerContainer } from '@/components/shared/animations';
import { FC } from 'react';
import FurnitureCard from './furniture-card';

const furnitureCategories = [
  {
    id: 'recliners',
    image:
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=400&fit=crop',
    imageAlt: 'Recliners',
    name: 'Recliners',
  },
  {
    id: 'corner-sofa',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
    imageAlt: 'Corner Sofa',
    name: 'Corner Sofa',
  },
  {
    id: 'tuxedo-sofa',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    imageAlt: 'Tuxedo Sofa',
    name: 'Tuxedo Sofa',
  },
  {
    id: 'sectionals',
    image:
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=400&fit=crop',
    imageAlt: 'Sectionals',
    name: 'Sectionals',
  },
  {
    id: 'lounge',
    image:
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&h=400&fit=crop',
    imageAlt: 'Lounge',
    name: 'Lounge',
  },
  {
    id: 'faiban',
    image:
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&h=400&fit=crop',
    imageAlt: 'Faiban',
    name: 'Faiban',
  },
];

const FurnitureCategories: FC = () => {
  return (
    <StaggerContainer
      staggerChildren={0.15}
      delayChildren={0.1}
      className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {furnitureCategories.map((category) => (
          <FurnitureCard
            key={category.id}
            image={category.image}
            imageAlt={category.imageAlt}
            name={category.name}
          />
        ))}
      </div>
    </StaggerContainer>
  );
};

export default FurnitureCategories;
