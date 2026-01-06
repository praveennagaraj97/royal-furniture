'use client';

import { Select } from '@/components/shared/select';
import { countries } from '@/utils/generated';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { FC, useMemo } from 'react';

const RegionSelect: FC = () => {
  const locale = useLocale();
  const params = useParams();
  const pathname = usePathname();

  const country = params?.country as string;

  // Memoize options to prevent unnecessary re-renders
  const regionOptions = useMemo(() => {
    return countries.map((item) => {
      const countryCode = item.country_code;
      const languageCode = item.language_code;

      // Construct the href to preserve the current path after the country/locale segments
      const segments = pathname.split('/').filter(Boolean);
      // segments[0] is country, segments[1] is locale
      const remainingPath = segments.slice(2).join('/');
      const href = `/${countryCode}/${languageCode}${
        remainingPath ? `/${remainingPath}` : ''
      }`;

      return {
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
        href,
      };
    });
  }, [pathname]);

  // Determine the currently selected item based on both country code and active locale
  const selectedItem = useMemo(() => {
    return (
      countries.find(
        (item) => item.country_code === country && item.language_code === locale
      ) ||
      countries.find((item) => item.language_code === locale) ||
      countries[0]
    );
  }, [country, locale]);

  if (!countries) {
    return null;
  }

  return (
    <Select
      value={selectedItem?.id.toString()}
      onChange={() => {}}
      options={regionOptions}
      customBaseClassName="flex items-center gap-2 text-gray-700 text-sm hover:text-deep-maroon transition-colors duration-200"
      className="w-auto border-none! bg-transparent! p-0!"
      customPanelWidth={200}
    />
  );
};

export default RegionSelect;
