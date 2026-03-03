'use client';

import { ViewOnce } from '@/components/shared/animations';
import { useFormatCurrency } from '@/hooks/use-format-currency';
import type { ProductDetailData } from '@/types/response';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FiEye } from 'react-icons/fi';
import { GoShare } from 'react-icons/go';
import { IoIosStarOutline } from 'react-icons/io';
import AddToWishList from './add-to-wishlist';

export interface ProductHeaderProps {
  product: ProductDetailData;
  onShareClick?: () => void;
  variantId?: number | null;
  isVariantWishlisted?: (variantId?: number | null) => boolean;
  updateVariantWishlist?: (variantId: number, value: boolean) => void;
}

export const ProductHeader: FC<ProductHeaderProps> = ({
  product,
  onShareClick,
  variantId,
  isVariantWishlisted,
  updateVariantWishlist,
}) => {
  const formatCurrency = useFormatCurrency();
  const t = useTranslations('product.header');

  const basePrice = product.product_info.pricing.base_price
    ? parseFloat(product.product_info.pricing.base_price)
    : 0;
  const offerPrice = product.product_info.pricing.offer_price
    ? parseFloat(product.product_info.pricing.offer_price)
    : basePrice;
  const savings = basePrice - offerPrice;
  const amountSaved = product.product_info.pricing.amount_saved
    ? parseFloat(product.product_info.pricing.amount_saved)
    : savings;

  const discount = product.product_info.pricing.offer_percentage
    ? Math.round(parseFloat(product.product_info.pricing.offer_percentage))
    : 0;

  return (
    <div className="space-y-3">
      <div>
        {/* Product Name */}
        <ViewOnce
          type="slideUp"
          distance={20}
          duration={0.5}
          delay={0.15}
          amount={0.01}
          margin="-40px"
        >
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl lg:text-3xl font-medium leading-tight">
              {product.product_info.name}
            </h1>

            {(variantId !== null && variantId !== undefined) || onShareClick ? (
              <div className="flex items-center gap-2 text-deep-maroon sm:mt-2 mt-1">
                {variantId !== null && variantId !== undefined && (
                  <AddToWishList
                    variantId={variantId}
                    isVariantWishlisted={isVariantWishlisted}
                    updateVariantWishlist={updateVariantWishlist}
                    variant="minimal"
                  />
                )}
                {onShareClick && (
                  <button
                    type="button"
                    aria-label="Share product"
                    className="p-0 text-deep-maroon hover:text-deep-maroon/80 transition-colors"
                    onClick={onShareClick}
                  >
                    <GoShare className="w-6 h-6" />
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </ViewOnce>
      </div>

      {/* Price */}
      <ViewOnce
        type="slideUp"
        distance={15}
        duration={0.4}
        delay={0.35}
        amount={0.01}
        margin="-40px"
      >
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600">
            {formatCurrency(offerPrice)}
          </span>
          {basePrice > offerPrice && (
            <span className="text-base sm:text-lg lg:text-xl text-gray-400 line-through font-bold">
              {formatCurrency(basePrice)}
            </span>
          )}

          {discount ? (
            <div className="bg-deep-maroon text-white text-xs md:text-sm font-bold px-2 py-1 rounded-md">
              {discount}% OFF
            </div>
          ) : null}
        </div>
      </ViewOnce>

      {/* Savings, Ratings and Views */}
      <div className="flex flex-col gap-1">
        <div className="flex space-x-3 items-center">
          {savings > 0 && (
            <ViewOnce
              type="fade"
              duration={0.4}
              delay={0.2}
              amount={0.01}
              margin="-40px"
            >
              {amountSaved > 0 && (
                <span className="text-green-600 font-medium text-sm sm:text-base lg:text-lg">
                  {t('saveAmount', { amount: formatCurrency(amountSaved) })}
                </span>
              )}
            </ViewOnce>
          )}
          {/* Rating */}
          <ViewOnce
            type="slideUp"
            distance={15}
            duration={0.4}
            delay={0.3}
            amount={0.01}
            margin="-40px"
          >
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <div className="flex items-center gap-1 shrink-0">
                {[...Array(5)].map((_, i) => (
                  <IoIosStarOutline
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < Math.floor(product.reviews_summary.average_rating)
                        ? 'fill-deep-maroon text-deep-maroon'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              {product.reviews_summary.average_rating > 0 && (
                <span className="text-deep-maroon">
                  {product.reviews_summary.average_rating.toFixed(1)}
                </span>
              )}
            </div>
          </ViewOnce>
        </div>

        {product.product_info.view_count > 0 && (
          <ViewOnce
            type="fade"
            duration={0.4}
            delay={0.25}
            amount={0.01}
            margin="-40px"
          >
            <div className="flex space-x-2 items-center w-fit p-2 bg-gray-50 rounded-md">
              <FiEye className="w-4 h-4 text-green-600 shrink-0" />
              <span className=" text-xs">
                {t('viewsIn24h', { count: product.product_info.view_count })}
              </span>
            </div>
          </ViewOnce>
        )}
      </div>
    </div>
  );
};
