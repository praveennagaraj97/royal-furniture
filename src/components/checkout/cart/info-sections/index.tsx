'use client';

import { FC } from 'react';
import { DeliveryInfoCard } from './delivery-card';
import { PromosCard } from './promos-card';
import { SupportCard } from './support-card';

export const CartInfoSections: FC = () => {
  return (
    <div className="space-y-4">
      <DeliveryInfoCard />
      <PromosCard />
      <SupportCard />
    </div>
  );
};
