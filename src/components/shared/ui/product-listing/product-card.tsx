'use client';

import { StaggerItem } from '@/components/shared/animations';
import Image from 'next/image';
import { FC } from 'react';

import { ProductItem } from '@/types';
import { formatCurrency } from '@/utils/format-currency';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import AddToCart from './add-to-cart';
import WishlistAction from './wishlist';

export interface ProductCardProps {
  product: ProductItem;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations();

  const countryCode = params.country as string;

  return (
    <StaggerItem
      type="slideUp"
      distance={30}
      duration={0.6}
      className="relative w-full min-w-70 sm:min-w-75 bg-white rounded-lg overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/4.5] overflow-hidden bg-gray-100 mb-3">
        <Image
          src={product.thumbnail_image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 320px"
        />

        {/* Discount Badge */}
        {parseFloat(product.pricing.offer_percentage || '0') > 0 && (
          <div className="absolute top-3 left-3 bg-deep-maroon text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10">
            {t('common.off', {
              percentage: parseFloat(
                product.pricing.offer_percentage || '0'
              ).toFixed(0),
            })}
          </div>
        )}

        <WishlistAction />
      </div>

      {/* Product Info Section */}
      <div className="space-y-2">
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-red-600 font-semibold text-lg">
            {formatCurrency(
              product.pricing.offer_price || 0,
              countryCode,
              locale
            )}
          </span>
          {product.pricing.base_price !== product.pricing.offer_price && (
            <span className="text-gray-400 text-sm font-medium line-through">
              {formatCurrency(
                product.pricing.base_price || 0,
                countryCode,
                locale
              )}
            </span>
          )}
        </div>

        {/* Product Name */}
        <p className="text-gray-900 text-base">{product.name}</p>

        <AddToCart />
      </div>
    </StaggerItem>
  );
};

export default ProductCard;
