'use client';

import { Select } from '@/components/shared/select';
import { countries } from '@/utils/generated';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { FC, useMemo } from 'react';

const RegionSelect: FC = () => {
  const locale = useLocale();

  // Memoize options to prevent unnecessary re-renders
  const regionOptions = useMemo(() => {
    return countries.map((item) => ({
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
      countries.find((item) => item.language_code === locale) || countries[0]
    );
  }, [locale]);

  const handleRegionChange = (val: string | number) => {
    const selected = countries.find(
      (item) => item.id.toString() === val.toString()
    );
    if (selected) {
      const countryCode = selected.country_code;
      const languageCode = selected.language_code;

      // Navigate to the new country/locale path
      // Note: We use window.location.href for a full refresh if switching countries,
      // as it's cleaner to reset the entire app state in this case.
      window.location.href = `/${countryCode}/${languageCode}`;
    }
  };

  if (!countries) {
    return null;
  }

  return (
    <Select
      value={selectedItem?.id.toString()}
      onChange={handleRegionChange}
      options={regionOptions}
      customBaseClassName="flex items-center gap-2 text-gray-700 text-sm hover:text-deep-maroon transition-colors duration-200"
      className="w-auto border-none! bg-transparent! p-0!"
      customPanelWidth={200}
    />
  );
};

export default RegionSelect;
