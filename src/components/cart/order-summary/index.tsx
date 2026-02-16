'use client';

import { FC } from 'react';
import { OrderSummaryCard } from './order-summary-card';
import { PaymentOptions } from './payment-options';

export const OrderSummarySection: FC = () => {
  return (
    <div className="space-y-4 sticky top-28">
      <OrderSummaryCard />
      <PaymentOptions />
    </div>
  );
};
