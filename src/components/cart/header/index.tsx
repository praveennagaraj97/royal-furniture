'use client';

import { FC } from 'react';
import { CartBreadcrumbs } from './cart-breadcrumbs';
import { CartProgress } from './cart-progress';

export const CartHeader: FC = () => {
  return (
    <div className="space-y-4">
      <CartBreadcrumbs />
      <CartProgress />
    </div>
  );
};
