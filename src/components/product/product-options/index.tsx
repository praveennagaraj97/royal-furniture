'use client';

import { type FC } from 'react';
import type { ProductDetailData } from '../types';
import { ColorSelection } from './color-selection';
import { CustomizeSection } from './customize-section';
import { QuantitySelector } from './quantity-selector';
import { SizeSelection } from './size-selection';

export interface ProductOptionsProps {
  product: ProductDetailData;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  onColorChange: (colorId: string) => void;
  onSizeChange: (sizeId: string) => void;
  onQuantityChange: (delta: number) => void;
}

export const ProductOptions: FC<ProductOptionsProps> = ({
  product,
  selectedColor,
  selectedSize,
  quantity,
  onColorChange,
  onSizeChange,
  onQuantityChange,
}) => {
  return (
    <div className="space-y-4">
      <ColorSelection
        colors={product.colors}
        selectedColor={selectedColor}
        onColorChange={onColorChange}
      />
      <CustomizeSection />
      <SizeSelection
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSizeChange={onSizeChange}
      />
      <QuantitySelector
        quantity={quantity}
        stockCount={product.stockCount}
        onQuantityChange={onQuantityChange}
      />
    </div>
  );
};

// Export individual components
export { ColorSelection } from './color-selection';
export type { ColorSelectionProps } from './color-selection';

export { CustomizeSection } from './customize-section';

export { SizeSelection } from './size-selection';
export type { SizeSelectionProps } from './size-selection';

export { QuantitySelector } from './quantity-selector';
export type { QuantitySelectorProps } from './quantity-selector';
