'use client';

import { StaggerItem } from '@/components/shared/animations';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';
import { FiChevronDown, FiGlobe } from 'react-icons/fi';
import CurrencySelect from './currency-select';

const BottomBar: FC = () => {
  const t = useTranslations('footer.bottomBar');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as 'en' | 'ar' });
  };

  return (
    <StaggerItem
      type="slideUp"
      distance={20}
      duration={0.5}
      className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3"
    >
      <p className="text-gray-700 text-sm">{t('copyright')}</p>
      <div className="flex items-center gap-4">
        {/* Region Selector */}
        <CurrencySelect />
        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <FiGlobe className="w-4 h-4 text-gray-700" />
          <div className="relative">
            <select
              value={locale}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="text-gray-700 text-sm bg-transparent border-none outline-none cursor-pointer hover:text-deep-maroon transition-colors duration-200 appearance-none pr-6 pl-2 py-1"
              aria-label="Select language"
            >
              <option value="en">{tCommon('english')}</option>
              <option value="ar">{tCommon('arabic')}</option>
            </select>
            <FiChevronDown className="w-4 h-4 text-gray-700 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </StaggerItem>
  );
};

export default BottomBar;
