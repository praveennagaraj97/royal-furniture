'use client';

import { StaggerItem } from '@/components/shared/animations';
import ResponsiveImage from '@/components/shared/ui/responsive-image';
import { FC } from 'react';
import { FiShoppingCart } from 'react-icons/fi';

import { AppLink } from '@/hooks';
import { ProductItem } from '@/types';
import { formatCurrency } from '@/utils/format-currency';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';

export interface ProductCardVariant2Props {
  product: ProductItem;
  className?: string;
}

export const ProductCardVariant2: FC<ProductCardVariant2Props> = ({
  product,
  className,
}) => {
  const params = useParams();
  const locale = useLocale();

  const countryCode = params.country as string;
  const offerPercentage = parseFloat(product.pricing.offer_percentage || '0');
  const hasDiscount = offerPercentage > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement add to cart functionality
  };

  return (
    <StaggerItem
      type="slideUp"
      distance={30}
      duration={0.6}
      className={`relative w-full bg-white rounded-lg overflow-hidden ${className || ''}`}
    >
      <AppLink
        href={`/${product.category.slug}/${product.sub_category.slug}/${product.slug}`}
      >
        {/* Image Container with Overlays */}
        <div className="group/image relative w-full overflow-visible mb-3">
          <div className="relative w-full  overflow-hidden ">
            <ResponsiveImage
              images={product.responsive_images}
              alt={product.name}
              className="object-cover transition-transform duration-300 group-hover/image:scale-105"
            />

            {/* Discount Badge - Top Left */}
            {hasDiscount && (
              <div className="absolute top-3 left-3 bg-deep-maroon text-white text-xs font-bold px-3 py-1.5 rounded z-10">
                {offerPercentage.toFixed(0)}% OFF
              </div>
            )}

            {/* Wishlist Action - Top Right */}
            {/* <WishlistAction
              isInWishlist={product.is_in_wishlist}
              productId={product.id}
            /> */}
          </div>

          {/* Add to Cart Button - Positioned between image and content (half on top, half on bottom) */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-0 right-2 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 z-10 shadow-sm translate-y-1/2"
            aria-label="Add to cart"
          >
            <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
        </div>

        {/* Product Info Section */}
        <div className="space-y-2">
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-semibold text-xs sm:text-sm">
              {formatCurrency(
                product.pricing.offer_price || 0,
                countryCode,
                locale,
              )}
            </span>
            {product.pricing.base_price &&
              product.pricing.base_price !== product.pricing.offer_price && (
                <span className="text-gray-400 text-xs font-medium line-through">
                  {formatCurrency(
                    product.pricing.base_price || 0,
                    countryCode,
                    locale,
                  )}
                </span>
              )}
          </div>

          {/* Product Name */}
          <p className="text-gray-900 text-sm sm:text-base line-clamp-1">
            {product.name}
          </p>

          {/* Color Options */}
          {product.available_colors && product.available_colors.length > 0 && (
            <div className="flex items-center gap-2 pt-1">
              {product.available_colors.slice(0, 4).map((color) => (
                <div
                  key={color.id}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-gray-200 shadow-sm"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.available_colors.length > 4 && (
                <span className="text-xs text-gray-500 ml-1">
                  +{product.available_colors.length - 4}
                </span>
              )}
            </div>
          )}

          {/* View Count - Below Colors */}
          {/* <div className="flex items-center gap-1.5 pt-1">
            <FiEye className="w-4 h-4 text-green-600" />
            <span className="text-gray-600 text-sm">156 views in 24 hrs</span>
          </div> */}
        </div>
      </AppLink>
    </StaggerItem>
  );
};
