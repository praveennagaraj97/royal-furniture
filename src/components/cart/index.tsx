'use client';

import { CartItemsSection } from '@/components/cart/cart-items';
import { FrequentlyBoughtSection } from '@/components/cart/frequently-bought';
import { CartHeader } from '@/components/cart/header';
import { CartInfoSections } from '@/components/cart/info-sections';
import { OrderSummarySection } from '@/components/cart/order-summary';
import { useCart } from '@/contexts/cart-context';
import { FC, Fragment } from 'react';

const CartPageContent: FC = () => {
  const { isHydrated } = useCart();

  //  Show loading state until cart is hydrated to prevent hydration mismatch
  if (!isHydrated) {
    return null;
  }

  return (
    <Fragment>
      <div className="section-container py-6 sm:py-8 lg:py-12 space-y-6 lg:space-y-10">
        <CartHeader />
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <CartItemsSection />
            <CartInfoSections />
          </div>
          <OrderSummarySection />
        </div>
      </div>
      <div className="pb-16">
        <FrequentlyBoughtSection />
      </div>
    </Fragment>
  );
};

export default CartPageContent;
