'use client';

import { ViewOnce } from '@/components/shared/animations';
import { Link } from '@/i18n/routing';
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
      margin="-100px"
      className="bg-soft-pink rounded-sm p-4 mb-6"
    >
      <Link href="#" className="flex items-center justify-between group">
        <div className="flex items-center gap-3">
          <FiPercent className="h-6 w-6 text-deep-maroon" />
          <span className="text-gray-900 font-semibold">{t('title')}</span>
        </div>
        <FiChevronRight className="h-5 w-5 text-gray-600 group-hover:text-deep-maroon transition-colors" />
      </Link>
    </ViewOnce>
  );
};

export default ExclusiveOffersBanner;
