'use client';

import { Select } from '@/components/shared/select';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

const CurrencySelect: FC = () => {
  const tCountries = useTranslations('countries');
  const [region, setRegion] = useState('AE');

  const regionOptions = [
    {
      label: (
        <div className="flex items-center gap-2">
          <span>🇦🇪</span>
          <span>{tCountries('AE')}</span>
        </div>
      ),
      value: 'AE',
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <span>🇸🇦</span>
          <span>{tCountries('SA')}</span>
        </div>
      ),
      value: 'SA',
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <span>🇰🇼</span>
          <span>{tCountries('KW')}</span>
        </div>
      ),
      value: 'KW',
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <span>🇶🇦</span>
          <span>{tCountries('QA')}</span>
        </div>
      ),
      value: 'QA',
    },
  ];

  return (
    <Select
      value={region}
      onChange={(val) => setRegion(val as string)}
      options={regionOptions}
      customBaseClassName="flex items-center gap-2 text-gray-700 text-sm hover:text-deep-maroon transition-colors duration-200"
      className="w-auto border-none! bg-transparent! p-0!"
      customPanelWidth={220}
    />
  );
};

export default CurrencySelect;
