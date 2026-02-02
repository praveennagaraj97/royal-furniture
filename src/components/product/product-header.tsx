'use client';

import { ViewOnce } from '@/components/shared/animations';
import { useFormatCurrency } from '@/hooks/use-format-currency';
import type { ProductDetailData } from '@/types/response';
import { FiEye } from 'react-icons/fi';
import { IoIosStarOutline } from 'react-icons/io';

export interface ProductHeaderProps {
  product: ProductDetailData;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({ product }) => {
  const formatCurrency = useFormatCurrency();

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
          <h1 className="text-2xl lg:text-3xl font-medium leading-tight">
            {product.product_info.name}
          </h1>
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
                  Save {formatCurrency(amountSaved)}
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
                {product.product_info.view_count} views in 24 hrs
              </span>
            </div>
          </ViewOnce>
        )}
      </div>
    </div>
  );
};
