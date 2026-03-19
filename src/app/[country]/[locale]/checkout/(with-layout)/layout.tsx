import CheckoutLayoutShell from '@/components/checkout/layout';
import { CheckoutShippingProvider } from '@/contexts/shipping-context';
import type { ReactNode } from 'react';

interface CheckoutLayoutProps {
  children: ReactNode;
}

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return (
    <CheckoutShippingProvider>
      <CheckoutLayoutShell>{children}</CheckoutLayoutShell>
    </CheckoutShippingProvider>
  );
}
