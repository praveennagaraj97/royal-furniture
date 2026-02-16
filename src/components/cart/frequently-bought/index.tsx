'use client';

import ProductListing from '@/components/shared/ui/product-listing';
import { useCart } from '@/contexts/cart-context';
import { FC } from 'react';

export const FrequentlyBoughtSection: FC = () => {
  const { frequentlyBought } = useCart();

  if (!frequentlyBought.length) {
    return null;
  }

  return (
    <ProductListing
      title="Frequently bought together"
      products={frequentlyBought}
    />
  );
};
