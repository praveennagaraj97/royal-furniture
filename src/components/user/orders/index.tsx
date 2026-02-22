'use client';

import {
  StaggerContainer,
  StaggerItem,
  ViewOnce,
} from '@/components/shared/animations';
import { FC } from 'react';
import { FiBox } from 'react-icons/fi';
import OrderCard from './order-card';
import type { OrderListItem } from './types';

const OrdersPageContent: FC = () => {
  // Temporary mocked orders for UI. Integrate real data when API is available.
  const orders: OrderListItem[] = [
    {
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
    },
    {
      id: '17139846',
      status: 'delivered',
      dateLabel: '02 Feb 2025',
      title: 'Kids Bed',
      colour: 'Black',
      quantity: 1,
      price: 799,
      originalPrice: 1299,
      currencySymbol: 'د.إ',
    },
    {
      id: '17139845',
      status: 'cancelled',
      dateLabel: '20 Jan 2025',
      title: 'Kids Bed',
      colour: 'Black',
      quantity: 1,
      price: 799,
      originalPrice: 1299,
      currencySymbol: 'د.إ',
    },
    {
      id: '17139844',
      status: 'pickup',
      dateLabel: '20 May 2025',
      title: 'Kids Bed',
      colour: 'Black',
      quantity: 1,
      price: 799,
      originalPrice: 1299,
      currencySymbol: 'د.إ',
    },
  ];

  if (!orders.length) {
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
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold  ">My Orders</h1>
          <p className="text-sm text-gray-500">
            View and manage all your recent purchases in one place.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <FiBox className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-lg font-semibold   mb-2">No orders yet</h2>
          <p className="text-sm text-gray-500 max-w-sm mb-6">
            Once you place an order, you&apos;ll be able to track it here.
          </p>
          <button
            type="button"
            className="px-6 py-3 bg-deep-maroon text-white rounded-lg font-medium hover:bg-deep-maroon/90 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Start Shopping
          </button>
        </div>
      </ViewOnce>
    );
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
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold  ">My Orders</h1>
        <p className="text-sm text-gray-500">
          View and manage all your recent purchases in one place.
        </p>
      </div>

      {/* Orders List */}
      <StaggerContainer
        staggerChildren={0.08}
        delayChildren={0.05}
        className="space-y-4"
      >
        {orders.map((order) => {
          return (
            <StaggerItem
              key={order.id}
              type="slideScale"
              direction="up"
              distance={20}
              initialScale={0.98}
              duration={0.35}
            >
              <OrderCard order={order} />
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </ViewOnce>
  );
};

export default OrdersPageContent;
