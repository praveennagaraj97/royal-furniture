'use client';

import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar: FC = () => {
  const t = useTranslations('common');

  return (
    <div className="relative grow">
      <FiSearch className="text-[#9CA3AF] absolute left-2 rtl:left-auto rtl:right-2 top-3 w-6 h-6" />
      <input
        type="text"
        placeholder={t('searchPlaceholder')}
        className="bg-[#F9FAFB] lg:py-3 py-2 w-full rounded-xl placeholder:text-[#9CA3AF] pl-9 rtl:pl-0 rtl:pr-9 border
        hover:border-gray-400/60 focus:border-gray-400/60 focus:outline-none
        transition-colors duration-150 delay-75 border-gray-100"
        suppressHydrationWarning
      />
    </div>
  );
};

export default SearchBar;
