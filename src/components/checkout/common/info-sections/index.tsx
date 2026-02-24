'use client';

import { useAuth } from '@/contexts/auth-context';
import { FC } from 'react';
import { PromosCard } from './promos-card';
import { SupportCard } from './support-card';

export const CartInfoSections: FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-4">
      {/* <DeliveryInfoCard /> */}
      {isAuthenticated ? <PromosCard /> : null}
      <SupportCard />
    </div>
  );
};
