'use client';

import {
  SlideIn,
  StaggerContainer,
  StaggerItem,
  ViewOnce,
} from '@/components/shared/animations';
import { FC } from 'react';
import type { OrderListItem } from '../types';

import ExpectedDeliveryCard from './expected-delivery-card';
import OrderDetailHeader from './order-detail-header';
import OrderSummaryCard from './order-summary-card';
import PickupInfoCard from './pickup-info-card';
import ProductSummaryCard from './product-summary-card';
import ShippingAddressCard from './shipping-address-card';
import TrackingTimeline, { type TrackingStep } from './tracking-timeline';

const mockOrder: OrderListItem = {
  id: '17139847',
  status: 'expectedDelivery',
  dateLabel: '25 Mar 2025',
  timeWindow: '9:00 am - 10:00 am',
  title: 'Kids Bed',
  colour: 'Black',
  quantity: 1,
  price: 799,
  originalPrice: 1299,
  currencySymbol: 'د.إ',
};

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
  const order = mockOrder;

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
      <OrderDetailHeader orderId={order.id} />

      <SlideIn>
        <ProductSummaryCard order={order} />
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
          <ShippingAddressCard />
          <OrderSummaryCard currencySymbol={order.currencySymbol} />
          <PickupInfoCard />
        </StaggerItem>
      </StaggerContainer>
    </ViewOnce>
  );
};

export default OrderDetailPageContent;
