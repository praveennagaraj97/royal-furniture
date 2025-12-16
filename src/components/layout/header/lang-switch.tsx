'use client';

import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { FC } from 'react';
import Dropdown from '../../shared/dropdown';

const LangSwitch: FC = () => {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: 'en' | 'ar') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Dropdown
      align={locale === 'ar' ? 'left' : 'right'}
      trigger={
        <div className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-gray-600 hover:text-[#7F1D1D] hover:bg-gray-100 transition-colors">
          <Globe className="h-5 w-5" />
          <span className="hidden sm:inline">{locale.toUpperCase()}</span>
        </div>
      }
    >
      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        className={`flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 ${
          locale === 'en' ? 'bg-gray-100' : ''
        }`}
      >
        <span>{t('english')}</span>
        <span className="text-xs text-gray-400">EN</span>
      </button>
      <button
        type="button"
        onClick={() => handleLanguageChange('ar')}
        className={`flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 ${
          locale === 'ar' ? 'bg-gray-100' : ''
        }`}
      >
        <span>{t('arabic')}</span>
        <span className="text-xs text-gray-400">AR</span>
      </button>
    </Dropdown>
  );
};

export default LangSwitch;
