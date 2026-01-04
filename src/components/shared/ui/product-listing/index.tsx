'use client';

import { StaggerContainer } from '@/components/shared/animations';
import Swiper from '@/components/shared/swiper';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Product } from '@/temp/data/products-data';
import ProductCard from './product-card';

export interface ProductListingProps {
  title: ReactNode;
  seeAllHref: string;
  products: Product[];
}

const ProductListing: FC<ProductListingProps> = ({
  title,
  seeAllHref,
  products,
}) => {
  return (
    <StaggerContainer
      staggerChildren={0.1}
      delayChildren={0.1}
      className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 overflow-hidden md:overflow-visible"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-end gap-3 flex-wrap">
          {typeof title === 'string' ? (
            <span className="lg:text-2xl md:text-xl text-lg text-indigo-slate">
              {title}
            </span>
          ) : (
            title
          )}
        </div>
        <Link
          href={seeAllHref}
          className="text-indigo-slate sm:text-sm text-xs font-medium hover:text-gray-700 transition-all duration-200 flex items-center gap-1 hover:scale-105"
        >
          <span>See All</span>
          <FiChevronRight className="sm:w-4 sm:h-4 w-2 h-2" />
        </Link>
      </div>

      {/* Products Swiper */}
      <Swiper gap={4} showNavigation hideArrowOnMobile>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Swiper>
    </StaggerContainer>
  );
};

export default ProductListing;
