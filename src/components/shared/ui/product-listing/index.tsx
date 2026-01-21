'use client';

import { StaggerContainer } from '@/components/shared/animations';
import Swiper from '@/components/shared/swiper';
import { useTranslations } from 'next-intl';
import { FC, ReactNode } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { ProductItem } from '@/types';
import ProductCard from './product-card';

export interface ProductListingProps {
  title: ReactNode;
  seeAllHref?: string;
  products: ProductItem[];
  isResponsive?: boolean;
}

const ProductListing: FC<ProductListingProps> = ({
  title,
  seeAllHref,
  products,
  isResponsive = false,
}) => {
  const t = useTranslations();

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
            <span className="lg:text-2xl md:text-xl text-lg text-indigo-slate font-medium">
              {title}
            </span>
          ) : (
            title
          )}
        </div>
        {seeAllHref ? (
          <a
            href={seeAllHref}
            className="text-indigo-slate sm:text-sm text-xs font-medium hover:text-gray-700 transition-all duration-200 flex items-center gap-1 hover:scale-105"
          >
            <span>{t('common.seeAll')}</span>
            <FiChevronRight className="sm:w-4 sm:h-4 w-2 h-2 rtl:rotate-180" />
          </a>
        ) : null}
      </div>

      {/* Products Swiper */}
      <Swiper gap={4} showNavigation hideArrowOnMobile alwaysAlignStart>
        {products.map((product) => (
          <div
            key={product.id}
            className="shrink-0 w-40 sm:w-48 md:w-56 lg:w-64 xl:w-80"
          >
            <ProductCard product={product} isResponsive={isResponsive} />
          </div>
        ))}
      </Swiper>
    </StaggerContainer>
  );
};

export default ProductListing;
