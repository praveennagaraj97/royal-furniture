'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import ShippingPageSkeleton from '@/components/skeletons/shipping-page-skeleton';
import { useCart } from '@/contexts/cart-context';
import { useCheckoutShipping } from '@/contexts/shipping-context';
import { FC, Fragment } from 'react';
import { DeliveryInfoCard } from '../common/info-sections/delivery-card';
import { OrderSummarySection } from '../common/order-summary';
import DeliveryOptionsSection from './delivery-options';
import PickupOptionsSection from './pickup-options';
import PickupStoresSection from './pickup-stores-section';
import { ShippingAddressSection } from './shipping-address-section';
import { ShippingMethodSection } from './shipping-method-section';

const ShippingPageContent: FC = () => {
  const { isHydrated } = useCart();
  const {
    shippingData,
    shippingMethod,
    isShippingFetching,
    // revalidateShipping,
  } = useCheckoutShipping();

  // useEffect(() => {
  //   if (!isHydrated) {
  //     return;
  //   }

  //   void revalidateShipping();
  // }, [isHydrated, revalidateShipping]);

  if (!isHydrated || (isShippingFetching && !shippingData)) {
    return <ShippingPageSkeleton />;
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
              {shippingMethod === 'pickup' ? (
                <PickupStoresSection />
              ) : (
                <ShippingAddressSection />
              )}
            </StaggerItem>
          </div>

          {/* Right column: full sticky area (desktop) with inner animated sections */}
          <div className="space-y-6 lg:self-start z-30 lg:sticky lg:top-28">
            <StaggerItem type="slideUp" distance={30}>
              <OrderSummarySection step="shipping" showPaymentPlans={false} />
            </StaggerItem>

            {shippingMethod === 'home' ? (
              <>
                <DeliveryInfoCard />
                <DeliveryOptionsSection />
              </>
            ) : (
              <>
                <PickupOptionsSection />
              </>
            )}
          </div>
        </StaggerContainer>
      </div>
    </Fragment>
  );
};

export default ShippingPageContent;
