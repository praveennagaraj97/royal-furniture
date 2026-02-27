'use client';

import MobileSortFilterControls from '@/components/category/subcategory-detail/mobile-sort-filter-controls';
import ProductsList from '@/components/category/subcategory-detail/products-list';
import SubcategoryFilters from '@/components/category/subcategory-detail/subcategory-filters';
import SubcategoryTopBar from '@/components/category/subcategory-detail/subcategory-top-bar';
import { ProductsListSkeleton } from '@/components/skeletons/products-list-skeleton';
import { SORT_OPTIONS } from '@/constants/sort-options';
import { useLayoutData } from '@/contexts/layout-context';
import { useGetProducts } from '@/hooks/api';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useResizeWindow } from '@/hooks/use-resize-window';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

const SubcategoryDetail: FC = () => {
  const tSort = useTranslations('sort');
  const params = useParams();
  const { categories } = useLayoutData();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('relevant');
  const [gridColumns, setGridColumns] = useState<3 | 4 | 5>(4);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, { ids: number[]; key: string }>
  >({});
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Get subcategory slug and ID from layout context
  const subcategorySlug = useMemo(() => {
    return params.subcategory as string;
  }, [params.subcategory]);

  const subcategoryId = useMemo(() => {
    const categorySlug = params.category as string;
    const category = categories.find((cat) => cat.slug === categorySlug);
    const subcategory = category?.subCategories?.find(
      (sub) => sub.slug === subcategorySlug,
    );
    return subcategory?.id || null;
  }, [categories, params.category, subcategorySlug]);

  // Build API parameters from filters
  const buildFilterParams = useMemo(() => {
    const params: Record<string, string> = {};
    Object.entries(selectedFilters).forEach(([, filter]) => {
      if (filter.ids?.length) {
        params[filter.key] = filter.ids.join(',');
      }
    });
    return params;
  }, [selectedFilters]);

  // Fetch products from API
  const {
    products: apiProducts,
    count: productCount,
    isLoadingInitialData,
    isLoadingMore,
    hasMore,
    loadMore,
  } = useGetProducts({
    sub_category_id: subcategorySlug,
    sort: selectedSort !== 'relevant' ? selectedSort : undefined,
    ...buildFilterParams,
    enabled: true,
  });

  const isSentinelVisible = useIntersectionObserver({
    ref: sentinelRef,
    options: {
      threshold: 0,
      rootMargin: '0px 0px 200px 0px',
      enabled: hasMore,
    },
  });

  // Update filter visibility on window resize
  useResizeWindow(() => {
    if (window.innerWidth < 1024) {
      setIsFilterVisible(false);
    }
  });

  // Use API products only
  const displayProducts = useMemo(() => {
    return apiProducts || [];
  }, [apiProducts]);

  const isInitialProductsLoading =
    isLoadingInitialData && displayProducts.length === 0;

  useEffect(() => {
    if (!hasMore || isLoadingMore) return;
    if (!isSentinelVisible) return;

    loadMore();
  }, [hasMore, isLoadingMore, isSentinelVisible, loadMore]);

  const localizedSortOptions = useMemo(
    () =>
      SORT_OPTIONS.map((opt) => ({
        ...opt,
        label: tSort(`options.${opt.id}`),
      })),
    [tSort],
  );

  const handleToggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleFiltersChange = (
    filters: Record<string, { ids: number[]; key: string }>,
  ) => {
    setSelectedFilters(filters);
  };

  return (
    <div className="section-container">
      {/* Top Bar */}
      <SubcategoryTopBar
        productCount={productCount || displayProducts.length}
        isFilterVisible={isFilterVisible}
        onToggleFilter={handleToggleFilter}
        sortOptions={localizedSortOptions}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        gridColumns={gridColumns}
        onGridColumnsChange={setGridColumns}
      />

      {/* Main Content */}
      <div className="flex gap-6 lg:border-t border-gray-200 lg:pt-6 mt-3">
        {/* Filter Sidebar - Only on lg+ screens */}
        <AnimatePresence mode="wait">
          {isFilterVisible && (
            <SubcategoryFilters
              key="filters"
              isVisible={isFilterVisible}
              onHide={handleToggleFilter}
              subcategoryId={subcategoryId}
              selectedFilters={selectedFilters}
              onFiltersChange={handleFiltersChange}
            />
          )}
        </AnimatePresence>

        {/* Products Column */}
        <div className="flex-1 flex flex-col gap-4">
          <ProductsList
            products={displayProducts}
            isFilterVisible={isFilterVisible}
            isLoading={isInitialProductsLoading}
            gridColumns={gridColumns}
          />

          {displayProducts.length > 0 && (hasMore || isLoadingMore) && (
            <div>
              <div ref={sentinelRef} className="h-px w-full" />
              {isLoadingMore && (
                <div className="mt-4">
                  <ProductsListSkeleton
                    isFilterVisible={isFilterVisible}
                    gridColumns={gridColumns}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <MobileSortFilterControls
        sortOptions={localizedSortOptions}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        onToggleFilter={handleToggleFilter}
        isFilterVisible={isFilterVisible}
      />
    </div>
  );
};

export default SubcategoryDetail;
