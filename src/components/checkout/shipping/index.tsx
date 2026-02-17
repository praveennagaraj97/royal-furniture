'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { useCart } from '@/contexts/cart-context';
import { FC, Fragment } from 'react';
import { OrderSummarySection } from '../cart/order-summary';
import { ShippingAddressSection } from './shipping-address-section';
import { DeliveryOptionsSection } from './shipping-delivery-options-section';
import { ShippingMethodSection } from './shipping-method-section';

const ShippingPageContent: FC = () => {
  const { isHydrated } = useCart();

  if (!isHydrated) {
    return null;
  }

  return (
    <Fragment>
      <div className="section-container">
        <StaggerContainer className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <StaggerItem type="slideUp" distance={30}>
              <ShippingMethodSection />
            </StaggerItem>
            <StaggerItem type="slideUp" distance={30}>
              <ShippingAddressSection />
            </StaggerItem>
            <StaggerItem type="slideUp" distance={30}>
              <DeliveryOptionsSection />
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
    </Fragment>
  );
};

export default ShippingPageContent;
