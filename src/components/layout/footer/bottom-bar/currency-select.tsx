'use client';

import { Select } from '@/components/shared/select';
import { usePathname, useRouter } from '@/i18n/routing';
import { currenciesData } from '@/utils/generated';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { FC, useMemo } from 'react';

const CurrencySelect: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const locale = useLocale();

  // Memoize options to prevent unnecessary re-renders
  const regionOptions = useMemo(() => {
    return currenciesData.map((item) => ({
      label: (
        <span className="flex items-center gap-2">
          {item.image && (
            <span className="relative inline-block w-5 h-3.5 shrink-0 overflow-hidden rounded-sm">
              <Image
                src={item.image}
                alt={item.country_name}
                fill
                className="object-cover"
              />
            </span>
          )}
          <span>{item.country_name}</span>
        </span>
      ),
      value: item.id.toString(),
    }));
  }, []);

  // Determine the currently selected item based on the active locale
  const selectedItem = useMemo(() => {
    return (
      currenciesData.find((item) => item.language_code === locale) ||
      currenciesData[0]
    );
  }, [locale]);

  const handleCurrencyChange = (val: string | number) => {
    const selected = currenciesData.find(
      (item) => item.id.toString() === val.toString()
    );
    if (selected) {
      console.log(selected);
      router.replace(`/${selected.currency.toLowerCase()}`, {
        locale: selected.language_code,
      });
    }
  };

  if (!currenciesData || currenciesData.length === 0) {
    return null;
  }

  return (
    <Select
      value={selectedItem?.id.toString()}
      onChange={handleCurrencyChange}
      options={regionOptions}
      customBaseClassName="flex items-center gap-2 text-gray-700 text-sm hover:text-deep-maroon transition-colors duration-200"
      className="w-auto border-none! bg-transparent! p-0!"
      customPanelWidth={200}
    />
  );
};

export default CurrencySelect;
