'use client';

import CardShowcase from '@/components/shared/ui/card-showcase';
import type { CardItem } from '@/components/shared/ui/card-showcase';
import { FC } from 'react';

const furnitureItems: CardItem[] = [
  {
    id: 'kids-bed',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=600&fit=crop',
    imageAlt: 'Kids Bed with teddy bear theme',
    label: 'Kids Bed',
  },
  {
    id: 'bedroom-set',
    image:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=600&fit=crop',
    imageAlt: 'Modern Bedroom Set',
    label: 'Bedroom Set',
  },
  {
    id: 'premium-bed',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=600&fit=crop',
    imageAlt: 'Premium Bed and Lounge Set',
    label: 'Premium Bed',
  },
];

const HomeFurnitureShowcase: FC = () => {
  return <CardShowcase items={furnitureItems} />;
};

export default HomeFurnitureShowcase;
