'use client';

import {
  Breadcrumb,
  type BreadcrumbItem,
} from '@/components/shared/ui/breadcrumb';
import { useParams } from 'next/navigation';
import { FC, useMemo } from 'react';
import {
  CheckoutProgress,
  checkoutSteps,
  type CheckoutStepId,
} from './progress';

interface CheckoutHeaderProps {
  currentStep: CheckoutStepId;
  breadcrumbItems?: BreadcrumbItem[];
}

export const CheckoutHeader: FC<CheckoutHeaderProps> = ({
  currentStep,
  breadcrumbItems,
}) => {
  const params = useParams<{ country?: string; locale?: string }>();

  const buildPath = (...segments: (string | undefined)[]) => {
    const filtered = segments.filter(Boolean) as string[];
    if (!filtered.length) return '/';
    return `/${filtered.join('/')}`;
  };

  const defaultBreadcrumbItems = useMemo(() => {
    const currentIndex = checkoutSteps.findIndex(
      (step) => step.id === currentStep,
    );
    const homeHref = buildPath(params?.country, params?.locale);

    return [
      { label: 'Home', href: homeHref },
      ...checkoutSteps.map((step, index): BreadcrumbItem => {
        const isPast = index < currentIndex;
        const href = isPast
          ? buildPath(params?.country, params?.locale, 'checkout', step.id)
          : undefined;

        if (isPast && href) {
          return { label: step.label, href };
        }

        return { label: step.label };
      }),
    ];
  }, [currentStep, params?.country, params?.locale]);

  const resolvedBreadcrumbItems = breadcrumbItems ?? defaultBreadcrumbItems;

  return (
    <>
      <Breadcrumb items={resolvedBreadcrumbItems} />
      <div className="section-container pb-6">
        <CheckoutProgress currentStep={currentStep} />
      </div>
    </>
  );
};
