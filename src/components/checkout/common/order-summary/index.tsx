'use client';

import type { CheckoutStepId } from '@/components/checkout/layout/progress';
import { FC } from 'react';
import { FlexiPay } from './flexi-pay';
import { OrderSummaryCard } from './order-summary-card';
import { PaymentOptions } from './payment-options';

interface OrderSummarySectionProps {
  step: CheckoutStepId;
  showPaymentPlans?: boolean;
  selectedPaymentMethod?: string;
}

export const OrderSummarySection: FC<OrderSummarySectionProps> = ({
  step,
  showPaymentPlans = true,
  selectedPaymentMethod,
}) => {
  return (
    <div className="space-y-4">
      <OrderSummaryCard
        step={step}
        selectedPaymentMethod={selectedPaymentMethod}
      />
      <FlexiPay />
      {showPaymentPlans && <PaymentOptions />}
    </div>
  );
};
