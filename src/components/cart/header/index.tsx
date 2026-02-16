'use client';

import {
  Breadcrumb,
  type BreadcrumbItem,
} from '@/components/shared/ui/breadcrumb';
import { FC } from 'react';
import { CartProgress } from './cart-progress';

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Sofas', href: '#' },
  { label: 'Royal Wooden Sofa' },
];

export const CartHeader: FC = () => {
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="section-container pb-6">
        <CartProgress />
      </div>
    </>
  );
};
