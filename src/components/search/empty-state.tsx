import { type FC } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchEmptyStateProps {
  query?: string;
}

export const SearchEmptyState: FC<SearchEmptyStateProps> = ({ query }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-2">
        <div className="absolute inset-0 bg-deep-maroon/10 rounded-full blur-xl" />
        <div className="relative bg-gray-50 rounded-full p-6">
          <FiSearch className="w-12 h-12 text-gray-400" />
        </div>
      </div>
      <h3 className="text-lg font-semibold   mb-2">No Results Found</h3>
      <p className="text-sm text-gray-500 text-center max-w-md">
        {query
          ? `We couldn't find any products matching "${query}". Try different keywords or browse our categories.`
          : 'Start searching for products by entering a keyword in the search bar.'}
      </p>
    </div>
  );
};
