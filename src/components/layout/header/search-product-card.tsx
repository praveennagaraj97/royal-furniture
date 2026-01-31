'use client';

import ResponsiveImage from '@/components/shared/ui/responsive-image';
import { AppLink } from '@/hooks';
import { useFormatCurrency } from '@/hooks/use-format-currency';
import { ProductItem } from '@/types';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface SearchProductCardProps {
  product: ProductItem;
  className?: string;
}

const SearchProductCard: FC<SearchProductCardProps> = ({
  product,
  className = '',
}) => {
  const t = useTranslations();
  const formatCurrency = useFormatCurrency();

  return (
    <div
      className={`relative w-full bg-white rounded-lg overflow-hidden ${className}`}
    >
      <AppLink
        href={
          product.sub_category.slug
            ? `/${product.category.slug}/${product.sub_category.slug}/${product.slug}`
            : `/${product.category.slug}/${product.slug}`
        }
      >
        {/* Image Container - Smaller */}
        <div className="group/image relative w-full aspect-square overflow-hidden bg-gray-100 mb-2">
          <ResponsiveImage
            images={product.responsive_images}
            alt={product.name}
            className="object-cover aspect-square transition-transform duration-300 group-hover/image:scale-105"
            shouldFill
          />

          {/* Discount Badge */}
          {parseFloat(product.pricing.offer_percentage || '0') > 0 && (
            <div className="absolute top-2 left-2 bg-deep-maroon text-white text-xs font-semibold px-2 py-0.5 rounded-md z-10">
              {t('common.off', {
                percentage: parseFloat(
                  product.pricing.offer_percentage || '0',
                ).toFixed(0),
              })}
            </div>
          )}
        </div>

        {/* Product Info Section - Compact */}
        <div className="space-y-1">
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-semibold text-sm">
              {formatCurrency(product.pricing.offer_price || 0)}
            </span>
            {product.pricing.base_price !== product.pricing.offer_price && (
              <span className="text-gray-400 text-xs font-medium line-through">
                {formatCurrency(product.pricing.base_price || 0)}
              </span>
            )}
          </div>

          {/* Product Name */}
          <p className="text-gray-900 text-xs line-clamp-2">{product.name}</p>
        </div>
      </AppLink>
    </div>
  );
};

export default SearchProductCard;
