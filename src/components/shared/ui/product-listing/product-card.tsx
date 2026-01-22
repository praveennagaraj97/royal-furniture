'use client';

import { ProductItem } from '@/types';
import { FC } from 'react';
import { ProductCardVariant1 } from './variants/variant-1';
import { ProductCardVariant2 } from './variants/variant-2';

export type ProductCardVariant = 'variant-1' | 'variant-2';

export interface ProductCardProps {
  product: ProductItem;
  variant?: ProductCardVariant;
  className?: string;
}

const ProductCard: FC<ProductCardProps> = ({
  product,
  variant = 'variant-2',
  className,
}) => {
  switch (variant) {
    case 'variant-2':
      return <ProductCardVariant2 product={product} className={className} />;
    case 'variant-1':
    default:
      return <ProductCardVariant1 product={product} className={className} />;
  }
};

export default ProductCard;
