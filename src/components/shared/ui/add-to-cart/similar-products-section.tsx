'use client';

import ProductCard from '@/components/shared/ui/product-listing/product-card';
import type { ProductItem } from '@/types';
import type { FC } from 'react';

interface SimilarProductsSectionProps {
  products: ProductItem[];
}

export const SimilarProductsSection: FC<SimilarProductsSectionProps> = ({
  products,
}) => {
  const hasProducts = products && products.length > 0;

  return (
    <section className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg sm:text-xl font-medium">Similar Products</h2>
        {hasProducts && (
          <button
            type="button"
            className="text-xs sm:text-sm font-medium text-indigo-slate hover:underline transition-colors duration-200"
          >
            See all
          </button>
        )}
      </div>

      {hasProducts ? (
        <div className="grid grid-cols-2 gap-3">
          {products.slice(0, 3).map((item) => (
            <ProductCard key={item.id} product={item} variant="variant-2" />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-200 px-4 py-8 bg-gray-50">
          <p className="text-sm text-gray-500 text-center">
            No similar products found right now.
          </p>
        </div>
      )}
    </section>
  );
};
