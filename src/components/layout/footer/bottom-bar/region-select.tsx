'use client';

import { Select } from '@/components/shared/select';
import { useAppPathName } from '@/hooks';
import { countries } from '@/utils/generated';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FC, useMemo } from 'react';

const RegionSelect: FC = () => {
  const locale = useLocale();
  const params = useParams();
  const pathname = useAppPathName();

  const country = params?.country as string;

  // Memoize options to prevent unnecessary re-renders
  const regionOptions = useMemo(() => {
    type Country = (typeof countries)[number];
    let filteredCountries: Country[] = Array.from(countries);

    filteredCountries = filteredCountries.filter(
      (item) => item.language_code === locale,
    );

    return filteredCountries.map((item) => {
      const countryCode = item.country_code;
      const languageCode = item.language_code;

      // Construct the href to preserve the current path after the country/locale segments
      const href = `/${countryCode}/${languageCode}${pathname}`;

      return {
        label: (
          <span className="flex items-center gap-2">
            {item.image && (
              <span className="relative inline-block w-5 h-3.5 shrink-0 overflow-hidden rounded-sm">
                <Image
                  src={item.image}
                  alt={item.country_name}
                  fill
                  sizes="20px"
                  className="object-cover"
                />
              </span>
            )}
            <span>{item.country_name}</span>
          </span>
        ),
        value: item.id.toString(),
        href,
      };
    });
  }, [pathname, locale]);

  // Determine the currently selected item based on both country code and active locale
  const selectedItem = useMemo(() => {
    return (
      countries.find(
        (item) =>
          item.country_code === country && item.language_code === locale,
      ) ||
      countries.find((item) => item.language_code === locale) ||
      countries[0]
    );
  }, [country, locale]);

  if (!countries) {
    return null;
  }

  return (
    <div className="bg-[#FFE8E8] rounded-md px-2 py-2">
      <Select
        value={selectedItem?.id.toString()}
        onChange={() => {}}
        options={regionOptions}
        customBaseClassName="flex items-center gap-2 text-gray-700 text-sm hover:text-deep-maroon transition-colors duration-200"
        className="w-auto border-none! bg-transparent! p-0!"
        customPanelWidth={200}
      />
    </div>
  );
};

export default RegionSelect;
