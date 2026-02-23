/* eslint-disable @next/next/no-img-element */
'use client';

import { AppLink } from '@/hooks';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { FC } from 'react';

export const CartEmptyState: FC = () => {
  const params = useParams<{ country?: string; locale?: string }>();

  const t = useTranslations('checkout.cart.empty');

  return (
    <div className="section-container flex flex-col items-center justify-center gap-4 py-14 text-center">
      <img
        src="/illustrations/cart-empty.png"
        alt={t('imageAlt')}
        className="h-36 w-auto mx-auto"
        loading="lazy"
      />
      <div className="space-y-2">
        <p className="text-xl font-semibold text-indigo-slate">{t('title')}</p>
        <p className="text-sm text-gray-500">{t('description')}</p>
      </div>
      <AppLink
        href="/"
        className="inline-flex items-center justify-center rounded-lg bg-deep-maroon px-4 py-2 text-sm font-semibold text-white hover:bg-[#6b0000] transition-colors"
      >
        {t('cta')}
      </AppLink>
    </div>
  );
};

export default CartEmptyState;
