'use client';

import type { ProductDetailData } from '@/types/response';
import { type FC, useMemo } from 'react';
import { ColorSelection } from './color-selection';
import { CustomizeSection } from './customize';
import { FabricSelection } from './fabric-selection';
import { QuantitySelector } from './quantity-selector';
import { SizeSelection } from './size-selection';

export interface ProductOptionsProps {
  product: ProductDetailData;
  selectedVariant: string;
  selectedFabric: string;
  selectedColor: string;
  quantity: number;
  onVariantChange: (variantName: string) => void;
  onFabricChange: (fabricName: string) => void;
  onColorChange: (colorId: string) => void;
  onQuantityChange: (delta: number) => void;
}

export const ProductOptions: FC<ProductOptionsProps> = ({
  product,
  selectedVariant,
  selectedFabric,
  selectedColor,
  quantity,
  onVariantChange,
  onFabricChange,
  onColorChange,
  onQuantityChange,
}) => {
  // Get current variant, fabric, and color
  const currentVariant = product.variants.find(
    (v) => v.name === selectedVariant,
  );
  const currentFabric = currentVariant?.fabricsList.find(
    (f) => f.name === selectedFabric,
  );
  const currentColor = currentFabric?.colorsList.find(
    (c) => String(c.id) === selectedColor,
  );

  // Extract colors from current fabric
  const colors = useMemo(() => {
    if (!currentFabric) return [];
    return currentFabric.colorsList.map((color) => ({
      id: String(color.id),
      name: color.fabric_color_info?.color_name || color.name,
      value: color.fabric_color_info?.color_hex || color.hex || '#000000',
      isImage: !!color.fabric_color_info?.fabric_color_image,
      imageUrl: color.fabric_color_info?.fabric_color_image || undefined,
    }));
  }, [currentFabric]);

  // Extract sizes from variants
  const sizes = useMemo(() => {
    return product.variants.map((variant) => ({
      id: variant.name.toLowerCase().replace(/\s+/g, '-'),
      label: variant.name,
    }));
  }, [product.variants]);

  return (
    <div className="space-y-4">
      <SizeSelection
        sizes={sizes}
        selectedSize={selectedVariant.toLowerCase().replace(/\s+/g, '-')}
        onSizeChange={(sizeId) => {
          const variant = product.variants.find(
            (v) => v.name.toLowerCase().replace(/\s+/g, '-') === sizeId,
          );
          if (variant) {
            onVariantChange(variant.name);
            // Reset fabric and color when variant changes
            const firstFabric = variant.fabricsList[0];
            if (firstFabric) {
              onFabricChange(firstFabric.name);
              const firstColor = firstFabric.colorsList[0];
              if (firstColor) {
                onColorChange(String(firstColor.id));
              }
            }
          }
        }}
        productName={product.product_info.name}
        productImage={
          currentColor?.images?.[0]?.responsive_images ||
          product.product_info.responsive_images
        }
      />
      {currentVariant && currentVariant.fabricsList.length > 1 && (
        <FabricSelection
          fabrics={currentVariant.fabricsList}
          selectedFabric={selectedFabric}
          onFabricChange={(fabricName) => {
            onFabricChange(fabricName);
            // Reset color when fabric changes
            const fabric = currentVariant.fabricsList.find(
              (f) => f.name === fabricName,
            );
            if (fabric && fabric.colorsList[0]) {
              onColorChange(String(fabric.colorsList[0].id));
            }
          }}
        />
      )}
      <ColorSelection
        colors={colors}
        selectedColor={selectedColor}
        onColorChange={onColorChange}
      />
      {!product.customization_options.is_customizable && (
        <CustomizeSection
          productName={product.product_info.name}
          productSlug={product.product_info.slug}
          currentImage={
            currentColor?.images?.[0]?.responsive_images ||
            product.product_info.responsive_images
          }
        />
      )}

      <QuantitySelector
        quantity={quantity}
        stockCount={currentColor?.stock}
        onQuantityChange={onQuantityChange}
      />
    </div>
  );
};

// Export individual components
export { ColorSelection } from './color-selection';
export type { ColorSelectionProps } from './color-selection';

export { CustomizeSection } from './customize';

export { FabricSelection } from './fabric-selection';
export type { FabricSelectionProps } from './fabric-selection';

export { SizeSelection } from './size-selection';
export type { SizeSelectionProps } from './size-selection';

export { QuantitySelector } from './quantity-selector';
export type { QuantitySelectorProps } from './quantity-selector';
