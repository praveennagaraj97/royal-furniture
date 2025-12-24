'use client';

import SectionTitleTag from '@/components/shared/ui/section-title-tag';
import { FC } from 'react';

import FurnitureShowcase from '../furniture-showcase';

const HouseHolds: FC = () => {
  return (
    <div className="container mx-auto px-3 mb-4 flex flex-col gap-3">
      <SectionTitleTag title="Households" className="text-xl font-semibold" />

      <FurnitureShowcase />
    </div>
  );
};

export default HouseHolds;
