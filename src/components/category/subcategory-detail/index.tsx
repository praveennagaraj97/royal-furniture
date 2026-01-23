'use client';

import ProductsList from '@/components/category/subcategory-detail/products-list';
import SubcategoryFilters from '@/components/category/subcategory-detail/subcategory-filters';
import SubcategoryTopBar from '@/components/category/subcategory-detail/subcategory-top-bar';
import { useLayoutData } from '@/contexts/layout-context';
import { useGetProducts } from '@/hooks/api';
import { useResizeWindow } from '@/hooks/use-resize-window';
import { AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { FC, useMemo, useState } from 'react';

export interface SortOption {
  id: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { id: 'relevant', label: 'Relevant Products' },
  { id: 'best_seller', label: 'Best Seller' },
  { id: 'new_arrival', label: 'New Arrival' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'discount', label: 'Discount' },
];

const SubcategoryDetail: FC = () => {
  const params = useParams();
  const { categories } = useLayoutData();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('relevant');
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

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

  // Fetch products from API
  const {
    products: apiProducts,
    isLoading: isLoadingProducts,
    count: productCount,
  } = useGetProducts({
    sub_category_id: subcategorySlug,
    sort: selectedSort !== 'relevant' ? selectedSort : undefined,
    ...(selectedFilters['filter-1']?.length && {
      color: selectedFilters['filter-1'].join(','),
    }),
    ...(selectedFilters['filter-2']?.length && {
      size_id: selectedFilters['filter-2'].join(','),
    }),
    ...(selectedFilters['filter-3']?.length && {
      type_id: selectedFilters['filter-3'].join(','),
    }),
    ...(selectedFilters['filter-4']?.length && {
      filter_capacity: selectedFilters['filter-4'].join(','),
    }),
    ...(selectedFilters['filter-5']?.length && {
      capacity: selectedFilters['filter-5'].join(','),
    }),
    enabled: true,
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

  const handleToggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleFiltersChange = (filters: Record<string, string[]>) => {
    setSelectedFilters(filters);
  };

  return (
    <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3">
      {/* Top Bar */}
      <SubcategoryTopBar
        productCount={productCount || displayProducts.length}
        isFilterVisible={isFilterVisible}
        onToggleFilter={handleToggleFilter}
        sortOptions={sortOptions}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
      />

      {/* Main Content */}
      <div className="flex gap-6 mt-6 border-t border-gray-200 pt-6">
        {/* Filter Sidebar - Only on lg+ screens */}
        <AnimatePresence mode="wait">
          {isFilterVisible && (
            <SubcategoryFilters
              key="filters"
              isVisible={isFilterVisible}
              onHide={handleToggleFilter}
              subcategoryId={subcategoryId}
              onFiltersChange={handleFiltersChange}
            />
          )}
        </AnimatePresence>

        {/* Products List */}
        <ProductsList
          products={displayProducts}
          isFilterVisible={isFilterVisible}
          isLoading={isLoadingProducts}
        />
      </div>
    </div>
  );
};

export default SubcategoryDetail;
