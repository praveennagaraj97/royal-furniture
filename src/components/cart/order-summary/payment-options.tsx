'use client';

import { PaymentDeliveryInfo } from '@/components/product/payment-delivery-info';
import { useCart } from '@/contexts/cart-context';
import { FC } from 'react';

export const PaymentOptions: FC = () => {
  const { totals } = useCart();

  return <PaymentDeliveryInfo productPrice={totals.total} showOnlyPlanCards />;
};
