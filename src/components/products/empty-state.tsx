import { useTranslations } from 'next-intl';
import { type FC } from 'react';
import { FiInbox } from 'react-icons/fi';

interface ProductsEmptyStateProps {
  type?: string;
}

export const ProductsEmptyState: FC<ProductsEmptyStateProps> = ({ type }) => {
  const t = useTranslations('products.empty');

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-2">
        <div className="absolute inset-0 bg-deep-maroon/10 rounded-full blur-xl" />
        <div className="relative bg-gray-50 rounded-full p-6">
          <FiInbox className="w-12 h-12 text-gray-400" />
        </div>
      </div>
      <h3 className="text-lg font-semibold   mb-2">{t('title')}</h3>
      <p className="text-sm text-gray-500 text-center max-w-md">
        {type ? t('withType', { type }) : t('generic')}
      </p>
    </div>
  );
};
