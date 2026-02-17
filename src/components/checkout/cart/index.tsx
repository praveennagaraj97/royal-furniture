'use client';

import { useCart } from '@/contexts/cart-context';
import { FC, Fragment } from 'react';
import { CartItemsSection } from './cart-items';
import { FrequentlyBoughtSection } from './frequently-bought';
import { CartInfoSections } from './info-sections';
import { OrderSummarySection } from './order-summary';

const CartPageContent: FC = () => {
  const { isHydrated } = useCart();

  //  Show loading state until cart is hydrated to prevent hydration mismatch
  if (!isHydrated) {
    return null;
  }

  return (
    <Fragment>
      <div className="section-container">
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <CartItemsSection />
            <CartInfoSections />
          </div>
          <div className="hidden lg:block lg:sticky lg:top-28 lg:self-start z-30">
            <OrderSummarySection />
          </div>
          <div className="lg:hidden">
            <OrderSummarySection />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <FrequentlyBoughtSection />
      </div>
    </Fragment>
  );
};

export default CartPageContent;
