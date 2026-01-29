'use client';

import { StaggerContainer } from '@/components/shared/animations';
import ProductCard from '@/components/shared/ui/product-listing/product-card';
import { ProductsListSkeleton } from '@/components/skeletons/products-list-skeleton';
import { SORT_OPTIONS } from '@/constants/sort-options';
import { useGetSearchResults } from '@/hooks/api';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { FC, useMemo, useState } from 'react';
import { SearchEmptyState } from './empty-state';
import SortBar from './sort-bar';

const SearchResults: FC = () => {
  const [selectedSort, setSelectedSort] = useState('relevant');
  const searchParams = useSearchParams();

  // Read search query directly from URL
  const searchQuery = useMemo(() => {
    const q = searchParams?.get('q');
    return q || '';
  }, [searchParams]);

  // Fetch search results from API
  const {
    products: apiProducts,
    isLoading: isLoadingProducts,
    totalCount,
    query: apiQuery,
  } = useGetSearchResults({
    q: searchQuery,
    sort: selectedSort !== 'relevant' ? selectedSort : undefined,
    enabled: !!searchQuery,
  });

  // Use API products
  const displayProducts = useMemo(() => {
    return apiProducts || [];
  }, [apiProducts]);

  const displayQuery = apiQuery || searchQuery;

  return (
    <div className="section-container mt-4">
      {/* Header with search query */}
      <div className="mb-2 flex space-x-2 justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Search Results
          </h1>
          {displayQuery && (
            <p className="text-sm text-gray-600">
              {totalCount > 0
                ? `Found ${totalCount} result${
                    totalCount !== 1 ? 's' : ''
                  } for "${displayQuery}"`
                : isLoadingProducts
                  ? ''
                  : `No results found for "${displayQuery}"`}
            </p>
          )}
        </div>
        {/* Sort Bar */}
        {searchQuery && (
          <SortBar
            productCount={totalCount || displayProducts.length}
            sortOptions={SORT_OPTIONS}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="mt-4 border-t border-gray-200 pt-6">
        {/* Products List */}
        {isLoadingProducts ? (
          <ProductsListSkeleton isFilterVisible={false} />
        ) : displayProducts.length === 0 ? (
          <div className="w-full">
            <SearchEmptyState query={displayQuery} />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full"
          >
            <StaggerContainer
              staggerChildren={0.05}
              delayChildren={0.1}
              className="grid gap-x-3 gap-y-6 grid-cols-2 lg:grid-cols-4"
            >
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </StaggerContainer>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
