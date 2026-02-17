'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
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
        <StaggerContainer className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <StaggerItem type="slideUp" distance={30}>
              <CartItemsSection />
            </StaggerItem>
            <StaggerItem type="slideUp" distance={30}>
              <CartInfoSections />
            </StaggerItem>
          </div>
          <StaggerItem type="slideUp" distance={30}>
            <div className="hidden lg:block lg:sticky lg:top-28 lg:self-start z-30">
              <OrderSummarySection />
            </div>
          </StaggerItem>
          <StaggerItem type="slideUp" distance={30}>
            <div className="lg:hidden">
              <OrderSummarySection />
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
      <div className="mt-6">
        <StaggerContainer>
          <StaggerItem type="slideUp" distance={30}>
            <FrequentlyBoughtSection />
          </StaggerItem>
        </StaggerContainer>
      </div>
    </Fragment>
  );
};

export default CartPageContent;
