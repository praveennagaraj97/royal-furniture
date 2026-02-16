'use client';

import { ViewOnce } from '@/components/shared/animations';
import { AppLink } from '@/hooks';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FiChevronRight, FiPercent } from 'react-icons/fi';

const ExclusiveOffersBanner: FC = () => {
  const t = useTranslations('user.exclusiveOffers');

  return (
    <ViewOnce
      type="slideUp"
      distance={20}
      duration={0.6}
      margin="-40px"
      className="bg-soft-pink rounded-sm p-4 mb-6"
    >
      <AppLink href="#" className="flex items-center justify-between group">
        <div className="flex items-center gap-3">
          <FiPercent className="h-6 w-6 text-deep-maroon" />
          <span className="  font-semibold">{t('title')}</span>
        </div>
        <FiChevronRight className="h-5 w-5 text-gray-600 group-hover:text-deep-maroon transition-colors" />
      </AppLink>
    </ViewOnce>
  );
};

export default ExclusiveOffersBanner;
