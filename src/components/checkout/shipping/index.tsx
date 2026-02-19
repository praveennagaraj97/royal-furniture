'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { useCart } from '@/contexts/cart-context';
import { FC, Fragment, useEffect } from 'react';
import { DeliveryInfoCard } from '../common/info-sections/delivery-card';
import { OrderSummarySection } from '../common/order-summary';
import DeliveryOptionsSection from './delivery-options';
import { ShippingAddressSection } from './shipping-address-section';
import { ShippingMethodSection } from './shipping-method-section';

const ShippingPageContent: FC = () => {
  const { isHydrated, loadShippingStep } = useCart();

  useEffect(() => {
    loadShippingStep();
  }, [loadShippingStep]);

  if (!isHydrated) {
    return null;
  }

  return (
    <Fragment>
      <div className="section-container">
        <StaggerContainer className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)]">
          {/* Left column: shipping method + address */}
          <div className="space-y-6">
            <StaggerItem type="slideUp" distance={30}>
              <ShippingMethodSection />
            </StaggerItem>
            <StaggerItem type="slideUp" distance={30}>
              <ShippingAddressSection />
            </StaggerItem>
          </div>

          {/* Right column: full sticky area (desktop) with inner animated sections */}
          <div className="space-y-6 lg:self-start z-30 lg:sticky lg:top-28">
            <StaggerItem type="slideUp" distance={30}>
              <OrderSummarySection step="shipping" showPaymentPlans={false} />
            </StaggerItem>
            <StaggerItem type="slideUp" distance={30}>
              <DeliveryInfoCard />
            </StaggerItem>
            <StaggerItem type="slideUp" distance={30}>
              <DeliveryOptionsSection />
            </StaggerItem>
          </div>
        </StaggerContainer>
      </div>
    </Fragment>
  );
};

export default ShippingPageContent;
