'use client';

import { StaggerContainer } from '@/components/shared/animations';
import ProductCard from '@/components/shared/ui/product-listing/product-card';
import { ProductsListSkeleton } from '@/components/skeletons/products-list-skeleton';
import { SORT_OPTIONS } from '@/constants/sort-options';
import { useGetProductsByType } from '@/hooks/api';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { FC, useMemo, useState } from 'react';
import { ProductsEmptyState } from './empty-state';
import SortBar from './sort-bar';

const ProductResults: FC = () => {
  const [selectedSort, setSelectedSort] = useState('relevant');
  const searchParams = useSearchParams();

  // Read type from URL
  const productType = useMemo(() => {
    const t = searchParams?.get('type');
    return t || '';
  }, [searchParams]);

  // Fetch products by type from API
  const {
    products: apiProducts,
    isLoading: isLoadingProducts,
    totalCount,
    query: apiQuery,
  } = useGetProductsByType({
    type: productType,
    sort: selectedSort !== 'relevant' ? selectedSort : undefined,
    enabled: !!productType,
  });

  // Use API products
  const displayProducts = useMemo(() => {
    return apiProducts || [];
  }, [apiProducts]);

  const displayType = apiQuery || productType;

  // Format type name for display (e.g., "trending" -> "Trending Products")
  const formattedTypeName = useMemo(() => {
    if (!displayType) return 'Products';
    return displayType
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, [displayType]);

  return (
    <div className="section-container mt-4">
      {/* Header with type */}
      <div className="mb-2 flex space-x-2 justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {formattedTypeName}
          </h1>
          {displayType && (
            <p className="text-sm text-gray-600">
              {totalCount > 0
                ? `Found ${totalCount} product${totalCount !== 1 ? 's' : ''}`
                : isLoadingProducts
                  ? ''
                  : `No products found for "${displayType}"`}
            </p>
          )}
        </div>
        {/* Sort Bar */}
        {productType && (
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
            <ProductsEmptyState type={displayType} />
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

export default ProductResults;
