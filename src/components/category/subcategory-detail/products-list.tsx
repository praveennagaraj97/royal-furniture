'use client';

import { ProductsEmptyState } from '@/components/category/subcategory-detail/empty-state';
import { StaggerContainer } from '@/components/shared/animations';
import ProductCard from '@/components/shared/ui/product-listing/product-card';
import { ProductsListSkeleton } from '@/components/skeletons/products-list-skeleton';
import { ProductItem } from '@/types';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface ProductsListProps {
  products: ProductItem[];
  isFilterVisible: boolean;
  isLoading?: boolean;
  gridColumns: 3 | 4 | 5;
}

const GRID_COLUMN_CLASS: Record<3 | 4 | 5, string> = {
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
};

const ProductsList: FC<ProductsListProps> = ({
  products,
  isFilterVisible,
  isLoading = false,
  gridColumns,
}) => {
  if (isLoading) {
    return (
      <ProductsListSkeleton
        isFilterVisible={isFilterVisible}
        gridColumns={gridColumns}
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <div
        className={`flex-1 transition-all duration-300 ${
          isFilterVisible ? 'lg:w-3/4' : 'w-full'
        }`}
      >
        <ProductsEmptyState />
      </div>
    );
  }

  return (
    <motion.div
      key={isFilterVisible ? 'with-filter' : 'without-filter'}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex-1 transition-all duration-300 ${
        isFilterVisible ? 'lg:w-3/4' : 'w-full'
      }`}
    >
      <StaggerContainer
        staggerChildren={0.05}
        delayChildren={0.1}
        className={`grid gap-x-3 gap-y-6 transition-all duration-300 grid-cols-2 ${GRID_COLUMN_CLASS[gridColumns]}`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </StaggerContainer>
    </motion.div>
  );
};

export default ProductsList;
