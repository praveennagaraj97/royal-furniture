'use client';

import type { CheckoutStepId } from '@/components/checkout/layout/progress';
import { FC } from 'react';
import { OrderSummaryCard } from './order-summary-card';
import { PaymentOptions } from './payment-options';

interface OrderSummarySectionProps {
  step: CheckoutStepId;
  showPaymentPlans?: boolean;
}

export const OrderSummarySection: FC<OrderSummarySectionProps> = ({
  step,
  showPaymentPlans = true,
}) => {
  return (
    <div className="space-y-4">
      <OrderSummaryCard step={step} />
      {showPaymentPlans && <PaymentOptions />}
    </div>
  );
};
