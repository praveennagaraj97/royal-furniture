'use client';

import { SlideIn } from '@/components/shared/animations';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FiInbox, FiLock } from 'react-icons/fi';

export const AuthRequiredState: FC = () => {
  const t = useTranslations('shipping');

  return (
    <SlideIn>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-medium text-gray-900">
            {t('titles.shippingAddress')}
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiLock className="h-4 w-4" />
          <span>{t('states.authDescription')}</span>
        </div>
      </section>
    </SlideIn>
  );
};

export const EmptyAddressesState: FC = () => {
  const t = useTranslations('shipping');

  return (
    <SlideIn>
      <div className="flex items-center gap-3 rounded-xl border border-dashed border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">
        <FiInbox className="h-5 w-5 text-gray-500" />
        <div>
          <p className="font-semibold text-gray-800">
            {t('states.emptyTitle')}
          </p>
          <p className="text-xs text-gray-500">
            {t('states.emptyDescription')}
          </p>
        </div>
      </div>
    </SlideIn>
  );
};
