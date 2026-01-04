'use client';

import { ViewOnce } from '@/components/shared/animations';
import { ChevronRight, CreditCard, Store } from 'lucide-react';
import type { ProductDetailData } from './types';

export interface ProductAdditionalInfoProps {
  product: ProductDetailData;
}

export const ProductAdditionalInfo: React.FC<ProductAdditionalInfoProps> = ({
  product,
}) => {
  return (
    <div className="space-y-4">
      {/* Delivery Information */}
      {product.deliveryDate && (
        <ViewOnce
          type="slideUp"
          distance={15}
          duration={0.4}
          delay={0.1}
          amount={0.01}
          margin="-100px"
        >
          <div className="p-4 bg-deep-maroon/5 rounded-lg flex flex-col sm:flex-row sm:justify-between items-start gap-3">
            <div className="flex items-center gap-2 text-sm text-deep-maroon min-w-0">
              <span>Delivery on</span>
              <span className="font-semibold text-indigo-slate">
                {product.deliveryDate}
              </span>
            </div>
            <button
              type="button"
              className="text-indigo-slate hover:underline font-medium text-sm whitespace-nowrap"
            >
              Update location
            </button>
          </div>
        </ViewOnce>
      )}

      {/* In-Store Trial */}
      <ViewOnce
        type="slideUp"
        distance={15}
        duration={0.4}
        delay={0.15}
        amount={0.01}
        margin="-100px"
      >
        <button
          type="button"
          className="w-full flex items-center justify-between p-2 bg-deep-maroon/10 rounded-lg transition-colors duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Store className="w-5 h-5 text-gray-700" />
            </div>
            <span className="font-semibold text-gray-900">Try in store!</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-deep-maroon transition-colors" />
        </button>
      </ViewOnce>

      {/* Flexi Payment */}
      <ViewOnce
        type="slideUp"
        distance={15}
        duration={0.4}
        delay={0.2}
        amount={0.01}
        margin="-100px"
      >
        <div className="p-2 bg-deep-maroon/10 rounded-lg">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-white rounded-lg shrink-0">
              <CreditCard className="w-5 h-5 text-deep-maroon" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium">Flexi Payment Available</div>
              <div className="text-sm text-deep-maroon font-medium">
                Pay 20% now, the rest before delivery.
              </div>
            </div>
            <button
              type="button"
              className="text-indigo-slate hover:underline text-sm font-medium whitespace-nowrap shrink-0"
            >
              See More
            </button>
          </div>
        </div>
      </ViewOnce>
    </div>
  );
};
