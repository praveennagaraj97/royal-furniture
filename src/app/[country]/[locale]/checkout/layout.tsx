import CheckoutLayoutShell from '@/components/checkout/layout';
import type { ReactNode } from 'react';

interface CheckoutLayoutProps {
  children: ReactNode;
}

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return <CheckoutLayoutShell>{children}</CheckoutLayoutShell>;
}
