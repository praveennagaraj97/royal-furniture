'use client';

import {
  SlideIn,
  StaggerContainer,
  StaggerItem,
  ViewOnce,
} from '@/components/shared/animations';
import { OrderDetailSkeleton } from '@/components/skeletons/order-detail-skeleton';
import { useGetOrderDetail } from '@/hooks/api';
import { useParams } from 'next/navigation';
import type { FC } from 'react';
import ExpectedDeliveryCard from './expected-delivery-card';
import OrderDetailHeader from './order-detail-header';
import OrderSummaryCard from './order-summary-card';
import PickupInfoCard from './pickup-info-card';
import ProductSummaryCard from './product-summary-card';
import ShippingAddressCard from './shipping-address-card';
import type { TrackingStep } from './tracking-timeline';
import TrackingTimeline from './tracking-timeline';

const trackingSteps: TrackingStep[] = [
  {
    title: 'Order Confirmed',
    date: '07 Mar 2025 | 8:00 PM',
    status: 'completed',
  },
  {
    title: 'Order Schedule',
    date: '08 Mar 2025 | 10:00 PM',
    status: 'completed',
  },
  {
    title: 'In production',
    date: '08 Mar 2025 | 11:00 PM',
    status: 'completed',
  },
  {
    title: 'Production Completed',
    date: '10 Mar 2025 | 08:00 PM',
    status: 'completed',
  },
  {
    title: 'Awaiting Delivery',
    date: '11 Mar 2025 | 09:00 PM',
    status: 'completed',
  },
  {
    title: 'On the way',
    date: '12 Mar 2025 | 07:00 PM',
    status: 'current',
  },
  {
    title: 'Delivered',
    date: '13 Mar 2025 | 10:00 PM',
    status: 'upcoming',
  },
];

const OrderDetailPageContent: FC = () => {
  const params = useParams();
  const orderIdParam = params?.orderId;
  const id = Array.isArray(orderIdParam) ? orderIdParam[0] : orderIdParam;

  const { order, isLoading } = useGetOrderDetail({ id, enabled: !!id });

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
      <OrderDetailHeader orderId={order.order_id} />

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
          <ExpectedDeliveryCard order={order} />
          <TrackingTimeline steps={trackingSteps} />
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
