'use client';

import SectionTitleTag from '@/components/shared/ui/section-title-tag';
import { FC } from 'react';
import type { HouseholdItem } from './household-showcase';

const householdItems: HouseholdItem[] = [
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
    <div className="container mx-auto px-3 flex flex-col gap-3 pb-4">
      <SectionTitleTag title="Households" className="text-xl font-semibold" />
      {/* <HouseholdShowcase items={householdItems} /> */}
    </div>
  );
};

export default HouseHolds;
