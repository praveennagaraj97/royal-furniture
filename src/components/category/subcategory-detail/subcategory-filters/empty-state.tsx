import { useTranslations } from 'next-intl';
import { type FC } from 'react';
import { FiFilter } from 'react-icons/fi';

export const FiltersEmptyState: FC = () => {
  const t = useTranslations('categories.filters.empty');

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-deep-maroon/10 rounded-full blur-xl" />
        <div className="relative bg-gray-50 rounded-full p-4">
          <FiFilter className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      <h3 className="text-sm font-semibold   mb-1">{t('title')}</h3>
      <p className="text-xs text-gray-500 text-center max-w-xs">
        {t('description')}
      </p>
    </div>
  );
};
