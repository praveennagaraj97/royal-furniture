'use client';

import ProductListing from '@/components/shared/ui/product-listing';
import { useCart } from '@/contexts/cart-context';
import { FC } from 'react';

export const SavedForLaterSection: FC = () => {
  const { savedForLater } = useCart();

  if (!savedForLater.length) {
    return null;
  }

  return <ProductListing title="Saved for later" products={savedForLater} />;
};

export default SavedForLaterSection;
