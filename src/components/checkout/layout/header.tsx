'use client';

import {
  Breadcrumb,
  type BreadcrumbItem,
} from '@/components/shared/ui/breadcrumb';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { FC, useMemo } from 'react';
import {
  CheckoutProgress,
  getCheckoutSteps,
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
  const t = useTranslations('checkout');
  const tProgress = useTranslations('checkout.progress');
  const params = useParams<{ country?: string; locale?: string }>();
  const steps = useMemo(() => getCheckoutSteps(tProgress), [tProgress]);

  const buildPath = (...segments: (string | undefined)[]) => {
    const filtered = segments.filter(Boolean) as string[];
    if (!filtered.length) return '/';
    return `/${filtered.join('/')}`;
  };

  const defaultBreadcrumbItems = useMemo(() => {
    const homeHref = buildPath(params?.country, params?.locale);
    const stepHref = buildPath(
      params?.country,
      params?.locale,
      'checkout',
      currentStep,
    );

    // Simplified breadcrumb: Home / <Current Step>
    return [
      { label: t('header.home'), href: homeHref },
      {
        label:
          steps.find((s) => s.id === currentStep)?.label ??
          t('header.checkout'),
        href: stepHref,
      },
    ];
  }, [currentStep, params?.country, params?.locale, steps, t]);

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
