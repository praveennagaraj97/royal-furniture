'use client';

import { StaggerItem } from '@/components/shared/animations';
import { useAppRouter } from '@/hooks';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { FiChevronDown, FiGlobe } from 'react-icons/fi';
import RegionSelect from './region-select';

const BottomBar: FC = () => {
  const t = useTranslations('footer.bottomBar');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useAppRouter();
  const pathname = usePathname();

  const otherLocale = locale === 'ar' ? 'en' : 'ar';
  const otherLabel =
    otherLocale === 'en' ? tCommon('english') : tCommon('arabic');

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    // segments[0] is country, segments[1] is locale
    const remainingPath = segments.slice(2).join('/');
    const newPath = `/${segments[0]}/${newLocale}${
      remainingPath ? `/${remainingPath}` : ''
    }`;
    router.replace(newPath);
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
        <RegionSelect />
        {/* Language Selector */}
        <div className="bg-[#FFE8E8] rounded-md px-2 py-1">
          <div className="flex items-center gap-1">
            <FiGlobe className="w-4 h-4 text-gray-700" />
            <div className="relative">
              <span className="text-gray-700 text-sm pr-6 pl-2 py-1 block">
                {otherLabel}
              </span>
              <select
                value={locale}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Select language"
              >
                <option value="en">{tCommon('english')}</option>
                <option value="ar">{tCommon('arabic')}</option>
              </select>
              <FiChevronDown className="w-4 h-4 text-gray-700 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>
    </StaggerItem>
  );
};

export default BottomBar;
