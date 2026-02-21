import { useTranslations } from 'next-intl';
import { type FC } from 'react';
import { FiPackage } from 'react-icons/fi';

export const ProductsEmptyState: FC = () => {
  const t = useTranslations('categories.subcategory.empty');

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-deep-maroon/10 rounded-full blur-xl" />
        <div className="relative bg-gray-50 rounded-full p-6">
          <FiPackage className="w-12 h-12 text-gray-400" />
        </div>
      </div>
      <h3 className="text-lg font-semibold   mb-2">{t('title')}</h3>
      <p className="text-sm text-gray-500 text-center max-w-md">
        {t('description')}
      </p>
    </div>
  );
};
