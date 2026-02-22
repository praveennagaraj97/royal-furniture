'use client';

import { SlideIn } from '@/components/shared/animations';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { HiMapPin } from 'react-icons/hi2';

export const DeliveryInfoCard: FC = () => {
  const t = useTranslations('checkout.cart.deliveryInfo');

  return (
    <SlideIn className="rounded-xl bg-[#FFF4F4] px-4 py-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-sm text-deep-maroon min-w-0 flex-1">
        <HiMapPin className="text-lg shrink-0" />
        <span className="truncate">{t('title')}</span>
        <span className="font-semibold text-indigo-slate shrink-0">
          {t('date')}
        </span>
      </div>
      {/* <button
        type="button"
        className="inline-flex items-center gap-1 self-start text-xs sm:text-sm font-semibold text-indigo-slate hover:underline whitespace-nowrap"
      >
        {t('update')}
      </button> */}
    </SlideIn>
  );
};
