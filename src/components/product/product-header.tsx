'use client';

import { ViewOnce } from '@/components/shared/animations';
import type { ProductDetailData } from '@/types/response';
import { IoIosStarOutline } from 'react-icons/io';

export interface ProductHeaderProps {
  product: ProductDetailData;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({ product }) => {
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
          margin="-100px"
        >
          <h1 className="text-3xl lg:text-4xl font-medium">
            {product.product_info.name}
          </h1>
        </ViewOnce>
      </div>

      {/* Savings and Views */}
      <div className="flex flex-col">
        {savings > 0 && (
          <ViewOnce
            type="fade"
            duration={0.4}
            delay={0.2}
            amount={0.01}
            margin="-100px"
          >
            {amountSaved > 0 && (
              <span className="text-green-600 font-semibold text-lg">
                Save ฿ {amountSaved.toLocaleString()}
              </span>
            )}
          </ViewOnce>
        )}
        {product.product_info.view_count > 0 && (
          <ViewOnce
            type="fade"
            duration={0.4}
            delay={0.25}
            amount={0.01}
            margin="-100px"
          >
            <span className="text-gray-600 text-sm">
              {product.product_info.view_count} views in 24 hrs
            </span>
          </ViewOnce>
        )}
      </div>

      {/* Rating */}
      <ViewOnce
        type="slideUp"
        distance={15}
        duration={0.4}
        delay={0.3}
        amount={0.01}
        margin="-100px"
      >
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <div className="flex items-center gap-1 shrink-0">
            {[...Array(5)].map((_, i) => (
              <IoIosStarOutline
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.reviews_summary.average_rating)
                    ? 'fill-deep-maroon text-deep-maroon'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-deep-maroon font-medium shrink-0">
            {product.reviews_summary.average_rating} (
            {product.reviews_summary.total_reviews} Reviews)
          </span>
          <button
            type="button"
            className="text-indigo-slate hover:underline text-sm font-semibold whitespace-nowrap shrink-0"
          >
            See Reviews
          </button>
        </div>
      </ViewOnce>

      {/* Price */}
      <ViewOnce
        type="slideUp"
        distance={15}
        duration={0.4}
        delay={0.35}
        amount={0.01}
        margin="-100px"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-red-600">
            ฿ {offerPrice.toLocaleString()}
          </span>
          {basePrice > offerPrice && (
            <span className="text-xl text-gray-400 line-through font-bold">
              ฿ {basePrice.toLocaleString()}
            </span>
          )}
        </div>
      </ViewOnce>
    </div>
  );
};
