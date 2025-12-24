'use client';

import type { CardItem } from '@/components/shared/ui/card-showcase';
import CardShowcase from '@/components/shared/ui/card-showcase';
import SectionTitleTag from '@/components/shared/ui/section-title-tag';
import { FC } from 'react';

const householdItems: CardItem[] = [
  {
    id: 'dining-tables',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=600&fit=crop',
    imageAlt: 'Dining Tables',
    label: 'Dining Tables',
  },
  {
    id: 'storage-cabinets',
    image:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=600&fit=crop',
    imageAlt: 'Storage Cabinets',
    label: 'Storage Cabinets',
  },
  {
    id: 'home-decor',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=600&fit=crop',
    imageAlt: 'Home Decor',
    label: 'Home Decor',
  },
  {
    id: 'lighting',
    image:
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=600&fit=crop',
    imageAlt: 'Lighting',
    label: 'Lighting',
  },
];

const HouseHolds: FC = () => {
  return (
    <div className="mb-4 flex flex-col gap-3">
      <div className="container mx-auto px-3">
        <SectionTitleTag title="Households" className="text-xl font-semibold" />
      </div>
      <CardShowcase
        items={householdItems}
        cardAspectRatio="aspect-[3/4]"
        cardMinWidth="min-w-[200px] sm:min-w-[220px] md:min-w-[240px] lg:min-w-[260px]"
      />
    </div>
  );
};

export default HouseHolds;
