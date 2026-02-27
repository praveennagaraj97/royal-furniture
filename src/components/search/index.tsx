'use client';

import { StaggerContainer } from '@/components/shared/animations';
import ProductCard from '@/components/shared/ui/product-listing/product-card';
import { ProductsListSkeleton } from '@/components/skeletons/products-list-skeleton';
import { SORT_OPTIONS } from '@/constants/sort-options';
import { useGetSearchResults } from '@/hooks/api';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { SearchEmptyState } from './empty-state';
import SortBar from './sort-bar';

const SearchResults: FC = () => {
  const tSearch = useTranslations('search.list');
  const tSort = useTranslations('sort');
  const [selectedSort, setSelectedSort] = useState('relevant');
  const searchParams = useSearchParams();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Read search query directly from URL
  const searchQuery = useMemo(() => {
    const q = searchParams?.get('q');
    return q || '';
  }, [searchParams]);

  // Fetch search results from API
  const {
    products: apiProducts,
    isLoadingInitialData,
    isLoadingMore,
    hasMore,
    loadMore,
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

  const isInitialLoading = isLoadingInitialData && displayProducts.length === 0;

  const isSentinelVisible = useIntersectionObserver({
    ref: sentinelRef,
    options: {
      threshold: 0,
      rootMargin: '0px 0px 200px 0px',
      enabled: hasMore,
    },
  });

  useEffect(() => {
    if (!hasMore || isLoadingMore) return;
    if (!isSentinelVisible) return;

    loadMore();
  }, [hasMore, isLoadingMore, isSentinelVisible, loadMore]);

  const displayQuery = apiQuery || searchQuery;

  const localizedSortOptions = useMemo(
    () =>
      SORT_OPTIONS.map((opt) => ({
        ...opt,
        label: tSort(`options.${opt.id}`),
      })),
    [tSort],
  );

  return (
    <div className="section-container mt-4">
      {/* Header with search query */}
      <div className="mb-2 flex space-x-2 justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold   mb-2">{tSearch('title')}</h1>
          {displayQuery && (
            <p className="text-sm text-gray-600">
              {totalCount > 0
                ? tSearch('foundForQuery', {
                    count: totalCount,
                    query: displayQuery,
                  })
                : isInitialLoading
                  ? ''
                  : tSearch('noneForQuery', { query: displayQuery })}
            </p>
          )}
        </div>
        {/* Sort Bar */}
        {searchQuery && (
          <SortBar
            productCount={totalCount || displayProducts.length}
            sortOptions={localizedSortOptions}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="mt-4 border-t border-gray-200 pt-6">
        {/* Products List */}
        {isInitialLoading ? (
          <ProductsListSkeleton isFilterVisible={false} />
        ) : displayProducts.length === 0 ? (
          <div className="w-full">
            <SearchEmptyState query={displayQuery} />
          </div>
        ) : (
          <>
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

            {(hasMore || isLoadingMore) && (
              <div className="mt-6">
                <div ref={sentinelRef} className="h-px w-full" />
                {isLoadingMore && (
                  <div className="mt-4">
                    <ProductsListSkeleton isFilterVisible={false} />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
