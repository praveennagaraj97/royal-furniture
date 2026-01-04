'use client';

import {
  FadeIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
} from '@/components/shared/animations';
import { Star } from 'lucide-react';
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
          <FadeIn duration={0.4} delay={0.2}>
            <div className="text-sm font-medium text-indigo-slate">
              Order now only {product.stockLeft} left
            </div>
          </FadeIn>
        )}

        {/* Product Name */}
        <SlideIn direction="up" distance={20} duration={0.5} delay={0.2}>
          <h1 className="text-3xl lg:text-4xl font-medium">{product.name}</h1>
        </SlideIn>
      </div>

      {/* Savings and Views */}
      <StaggerContainer
        staggerChildren={0.05}
        delayChildren={0.25}
        className="flex flex-col"
      >
        {savings > 0 && (
          <StaggerItem type="fade" duration={0.4}>
            <span className="text-green-600 font-semibold text-lg">
              Save ฿ {savings.toLocaleString()}
            </span>
          </StaggerItem>
        )}
        {product.views24h && (
          <StaggerItem type="fade" duration={0.4}>
            <span className="text-gray-600 text-sm">
              {product.views24h} views in 24 hrs
            </span>
          </StaggerItem>
        )}
      </StaggerContainer>

      {/* Rating */}
      <SlideIn direction="up" distance={15} duration={0.4} delay={0.3}>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? 'stroke-deep-maroon text-deep-maroon'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-deep-maroon font-medium">
            {product.rating} ({product.reviewCount} Reviews)
          </span>
          <button
            type="button"
            className="text-indigo-slate hover:underline text-sm font-semibold"
          >
            See Reviews
          </button>
        </div>
      </SlideIn>

      {/* Price */}
      <SlideIn direction="up" distance={15} duration={0.4} delay={0.35}>
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
      </SlideIn>
    </div>
  );
};
