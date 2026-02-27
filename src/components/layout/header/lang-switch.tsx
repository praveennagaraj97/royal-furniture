'use client';

import { AppLink } from '@/hooks';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { FiGlobe } from 'react-icons/fi';
import Dropdown from '../../shared/dropdown';

const LangSwitch: FC = () => {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();

  const otherLocale = locale === 'ar' ? 'en' : 'ar';
  const otherLabel = otherLocale === 'en' ? t('english') : t('arabic');

  const segments = pathname.split('/').filter(Boolean);
  const remainingPath = segments.slice(2).join('/');

  const getLangPath = (newLocale: string) => {
    // segments[0] is country code
    return `/${segments[0]}/${newLocale}${
      remainingPath ? `/${remainingPath}` : ''
    }`;
  };

  return (
    <Dropdown
      align={locale === 'ar' ? 'left' : 'right'}
      trigger={
        <div className="flex items-center gap-1.5 sm:gap-2 rounded-full px-2 sm:px-3 py-1.5 text-sm text-black bg-gray-50 hover:text-[#7F1D1D] hover:bg-gray-100 transition-colors">
          <FiGlobe className="h-5 w-5" />
          <span className="hidden sm:inline">{otherLabel}</span>
        </div>
      }
    >
      <AppLink
        href={getLangPath('en')}
        className={`flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 ${
          locale === 'en' ? 'bg-gray-100' : ''
        }`}
      >
        <span>{t('english')}</span>
        <span className="text-xs text-gray-400">EN</span>
      </AppLink>
      <AppLink
        href={getLangPath('ar')}
        className={`flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 ${
          locale === 'ar' ? 'bg-gray-100' : ''
        }`}
      >
        <span>{t('arabic')}</span>
        <span className="text-xs text-gray-400">AR</span>
      </AppLink>
    </Dropdown>
  );
};

export default LangSwitch;
