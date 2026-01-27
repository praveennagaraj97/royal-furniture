import { type FC } from 'react';
import { FiInbox } from 'react-icons/fi';

interface ProductsEmptyStateProps {
  type?: string;
}

export const ProductsEmptyState: FC<ProductsEmptyStateProps> = ({ type }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-2">
        <div className="absolute inset-0 bg-deep-maroon/10 rounded-full blur-xl" />
        <div className="relative bg-gray-50 rounded-full p-6">
          <FiInbox className="w-12 h-12 text-gray-400" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No Products Found
      </h3>
      <p className="text-sm text-gray-500 text-center max-w-md">
        {type
          ? `We couldn't find any products in the "${type}" category at the moment. Please check back later.`
          : 'No products available. Please select a category to browse.'}
      </p>
    </div>
  );
};
