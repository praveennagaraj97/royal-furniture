'use client';

import {
  SlideIn,
  StaggerContainer,
  StaggerItem,
  ViewOnce,
} from '@/components/shared/animations';
import { OrderDetailSkeleton } from '@/components/skeletons/order-detail-skeleton';
import { useGetOrderDetail, useGetOrderTracking } from '@/hooks/api';
import { useParams } from 'next/navigation';
import type { FC } from 'react';
import { useMemo } from 'react';
import ExpectedDeliveryCard from './expected-delivery-card';
import OrderSummaryCard from './order-summary-card';
import PickupInfoCard from './pickup-info-card';
import ProductSummaryCard from './product-summary-card';
import ShippingAddressCard from './shipping-address-card';
import type { TrackingStep } from './tracking-timeline';
import TrackingTimeline from './tracking-timeline';

const OrderDetailPageContent: FC = () => {
  const params = useParams();
  const orderIdParam = params?.orderId;
  const id = Array.isArray(orderIdParam) ? orderIdParam[0] : orderIdParam;

  const { order, isLoading } = useGetOrderDetail({ id, enabled: !!id });

  const canTrack = !!order?.delivery_card?.can_track;
  const { tracking, isLoading: isTrackingLoading } = useGetOrderTracking({
    id,
    enabled: !!id && canTrack,
  });

  const trackingSteps: TrackingStep[] = useMemo(() => {
    const timeline = tracking?.status_timeline || [];
    if (!timeline.length) return [];

    return timeline.map((item, index) => {
      const isLast = index === timeline.length - 1;
      const status: TrackingStep['status'] = isLast ? 'current' : 'completed';
      return {
        title: item.status_label,
        date: item.timestamp,
        status,
      };
    });
  }, [tracking]);

  const canCancel = tracking?.current_status === 'pending';

  if (isLoading || !order) {
    return <OrderDetailSkeleton />;
  }

  return (
    <ViewOnce
      type="slideUp"
      distance={20}
      duration={0.4}
      delay={0.05}
      amount={0.01}
      margin="-40px"
      className="space-y-6"
    >
      {/* <OrderDetailHeader orderId={order.order_id} /> */}

      <SlideIn>
        <ProductSummaryCard detail={order} />
      </SlideIn>
      <StaggerContainer
        staggerChildren={0.08}
        delayChildren={0.05}
        className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2.2fr)] gap-6"
      >
        <StaggerItem
          type="slideUp"
          distance={20}
          duration={0.4}
          className="space-y-4"
        >
          <ExpectedDeliveryCard order={order} canCancel={canCancel} />
          <section className="bg-white rounded-sm border border-gray-200 p-4">
            {canTrack ? (
              <>
                {isTrackingLoading && (
                  <div className="text-xs text-gray-500">Loading tracking…</div>
                )}
                {!isTrackingLoading && trackingSteps.length > 0 && (
                  <TrackingTimeline steps={trackingSteps} />
                )}
                {!isTrackingLoading && trackingSteps.length === 0 && (
                  <p className="text-xs text-gray-500">
                    No tracking updates are available for this order yet.
                  </p>
                )}
              </>
            ) : (
              <p className="text-xs text-gray-500">
                Tracking is not available for this order.
              </p>
            )}
          </section>
        </StaggerItem>

        <StaggerItem
          type="slideUp"
          distance={20}
          duration={0.4}
          className="space-y-4"
        >
          <ShippingAddressCard address={order.shipping_address} />
          <OrderSummaryCard summary={order.order_summary} />
          <PickupInfoCard />
        </StaggerItem>
      </StaggerContainer>
    </ViewOnce>
  );
};

export default OrderDetailPageContent;
