'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { type ReactNode, useMemo } from 'react';
import { CheckoutHeader } from './header';
import type { CheckoutStepId } from './progress';

interface CheckoutLayoutShellProps {
  children: ReactNode;
}

const mapSegmentToStep = (segment: string | null): CheckoutStepId => {
  if (segment === 'shipping') return 'shipping';
  if (segment === 'payment') return 'payment';
  return 'cart';
};

const CheckoutLayoutShell = ({ children }: CheckoutLayoutShellProps) => {
  const segment = useSelectedLayoutSegment();

  const currentStep = useMemo(() => mapSegmentToStep(segment), [segment]);

  return (
    <>
      <CheckoutHeader currentStep={currentStep} />
      {children}
    </>
  );
};

export default CheckoutLayoutShell;
