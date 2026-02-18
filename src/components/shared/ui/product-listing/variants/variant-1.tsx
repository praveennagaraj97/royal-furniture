'use client';

import ResponsiveImage from '@/components/shared/ui/responsive-image';
import { FC } from 'react';

import { AppLink } from '@/hooks';
import { useFormatCurrency } from '@/hooks/use-format-currency';
import { ProductItem } from '@/types';
import { useTranslations } from 'next-intl';
import AddToCart from '../add-to-cart';

export interface ProductCardVariant1Props {
  product: ProductItem;
  className?: string;
}

export const ProductCardVariant1: FC<ProductCardVariant1Props> = ({
  product,
  className,
}) => {
  const t = useTranslations();

  const formatCurrency = useFormatCurrency();

  return (
    <div className={`relative w-full bg-white rounded-lg overflow-hidden ${className || ''}`}>
      <AppLink
        href={`/${product.category.slug}/${product.sub_category.slug}/${product.slug}`}
      >
        {/* Image Container */}
        <div className="group/image relative w-full overflow-hidden bg-gray-100 mb-3">
          <ResponsiveImage
            images={product.responsive_images}
            alt={product.name}
            className="object-cover transition-transform duration-300 group-hover/image:scale-105"
          />

          {/* Discount Badge */}
          {parseFloat(product.pricing.offer_percentage || '0') > 0 && (
            <div className="absolute top-3 left-3 bg-deep-maroon text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10">
              {t('common.off', {
                percentage: parseFloat(
                  product.pricing.offer_percentage || '0',
                ).toFixed(0),
              })}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="space-y-2">
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-semibold text-xs sm:text-sm">
              {formatCurrency(product.pricing.offer_price || 0)}
            </span>
            {product.pricing.base_price !== product.pricing.offer_price && (
              <span className="text-gray-400 text-xs font-medium line-through">
                {formatCurrency(product.pricing.base_price || 0)}
              </span>
            )}
          </div>

          {/* Product Name */}
          <p className="  text-sm sm:text-base line-clamp-1">{product.name}</p>

          <AddToCart />
        </div>
      </AppLink>
    </div>
  );
};
