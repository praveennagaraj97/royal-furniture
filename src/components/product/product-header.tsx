'use client';

import { ViewOnce } from '@/components/shared/animations';
import { IoIosStarOutline } from 'react-icons/io';
import type { ProductDetailData } from './types';

export interface ProductHeaderProps {
  product: ProductDetailData;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({ product }) => {
  const savings = product.originalPrice - product.price;

  return (
    <div className="space-y-3">
      <div>
        {/* Availability Notice */}
        {product.stockLeft !== undefined && product.stockLeft > 0 && (
          <ViewOnce
            type="fade"
            duration={0.4}
            delay={0.1}
            amount={0.01}
            margin="-100px"
          >
            <div className="text-sm font-medium text-indigo-slate">
              Order now only {product.stockLeft} left
            </div>
          </ViewOnce>
        )}

        {/* Product Name */}
        <ViewOnce
          type="slideUp"
          distance={20}
          duration={0.5}
          delay={0.15}
          amount={0.01}
          margin="-100px"
        >
          <h1 className="text-3xl lg:text-4xl font-medium">{product.name}</h1>
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
            <span className="text-green-600 font-semibold text-lg">
              Save ฿ {savings.toLocaleString()}
            </span>
          </ViewOnce>
        )}
        {product.views24h && (
          <ViewOnce
            type="fade"
            duration={0.4}
            delay={0.25}
            amount={0.01}
            margin="-100px"
          >
            <span className="text-gray-600 text-sm">
              {product.views24h} views in 24 hrs
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
                  i < Math.floor(product.rating)
                    ? 'fill-deep-maroon text-deep-maroon'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-deep-maroon font-medium shrink-0">
            {product.rating} ({product.reviewCount} Reviews)
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
            ฿ {product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xl text-gray-400 line-through font-bold">
              ฿ {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </ViewOnce>
    </div>
  );
};
