'use client';

import { StaggerContainer } from '@/components/shared/animations';
import ProductCard from '@/components/shared/ui/product-listing/product-card';
import { ProductsListSkeleton } from '@/components/skeletons/products-list-skeleton';
import { ProductsEmptyState } from '@/components/category/subcategory-detail/empty-state';
import { ProductItem } from '@/types';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface ProductsListProps {
  products: ProductItem[];
  isFilterVisible: boolean;
  isLoading?: boolean;
}

const ProductsList: FC<ProductsListProps> = ({
  products,
  isFilterVisible,
  isLoading = false,
}) => {
  if (isLoading) {
    return <ProductsListSkeleton isFilterVisible={isFilterVisible} />;
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
        className={`grid gap-x-3 gap-y-6 transition-all duration-300 ${
          // On mobile/tablet, always use 2 columns when filter is visible, 2 columns when hidden
          // On lg+, use 3 columns when filter visible, 4 columns when hidden
          isFilterVisible
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isResponsive={true} />
        ))}
      </StaggerContainer>
    </motion.div>
  );
};

export default ProductsList;
