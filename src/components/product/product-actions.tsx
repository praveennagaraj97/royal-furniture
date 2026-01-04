'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { ShoppingCart } from 'lucide-react';

export interface ProductActionsProps {
  onAddToCart?: () => void;
  onBuyNow?: () => void;
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  onAddToCart,
  onBuyNow,
}) => {
  return (
    <StaggerContainer
      staggerChildren={0.1}
      delayChildren={0.6}
      className="flex flex-col sm:flex-row gap-3"
    >
      <StaggerItem
        type="slideUp"
        distance={20}
        duration={0.4}
        className="w-full"
      >
        <button
          type="button"
          onClick={onAddToCart}
          className="whitespace-nowrap flex items-center justify-center w-full gap-2 bg-deep-maroon text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#6b0000] transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
      </StaggerItem>
      <StaggerItem type="slideUp" distance={20} duration={0.4}>
        <button
          type="button"
          onClick={onBuyNow}
          className="whitespace-nowrap border-2 border-deep-maroon text-deep-maroon py-2.5 px-6 rounded-lg font-semibold hover:bg-deep-maroon hover:text-white transition-all duration-200"
        >
          Buy Now
        </button>
      </StaggerItem>
    </StaggerContainer>
  );
};
