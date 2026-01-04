'use client';

import { ViewOnce } from '@/components/shared/animations';
import { useState, type FC } from 'react';
import { ProductImages } from './image-carousel';
import { ProductActions } from './product-actions';
import { ProductAdditionalInfo } from './product-additional-info';
import { ProductHeader } from './product-header';
import { ProductOptions } from './product-options';
import type { ProductDetailData } from './types';

export interface ProductDetailProps {
  data: ProductDetailData;
}

export interface ProductDetailSectionProps {
  product: ProductDetailData;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  onWishlistClick?: () => void;
  onShareClick?: () => void;
  isWishlisted?: boolean;
}

export const ProductDetailSection: FC<ProductDetailSectionProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onWishlistClick,
  onShareClick,
  isWishlisted = false,
}) => {
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.id || ''
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.id || '');
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    if (product.stockCount) {
      setQuantity(Math.min(newQuantity, product.stockCount));
    } else {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 max-w-full w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Image Carousel */}
        <ViewOnce type="slideUp" distance={30} duration={0.6} delay={0.1} amount={0.01} margin="-100px">
          <div className="min-w-0 w-full">
            <ProductImages
              product={product}
              onWishlistClick={onWishlistClick}
              onShareClick={onShareClick}
              isWishlisted={isWishlisted}
            />
          </div>
        </ViewOnce>

        {/* Right Side - Product Details */}
        <ViewOnce type="slideUp" distance={30} duration={0.6} delay={0.2} amount={0.01} margin="-100px">
          <div className="min-w-0 w-full space-y-4">
            <ProductHeader product={product} />
            <ProductOptions
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              quantity={quantity}
              onColorChange={setSelectedColor}
              onSizeChange={setSelectedSize}
              onQuantityChange={handleQuantityChange}
            />
            <ProductActions onAddToCart={onAddToCart} onBuyNow={onBuyNow} />
            <ProductAdditionalInfo product={product} />
          </div>
        </ViewOnce>
      </div>
    </div>
  );
};

export interface ProductDetailProps {
  data: ProductDetailData;
}

export const ProductDetail: FC<ProductDetailProps> = ({ data }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    // Handle add to cart logic
    console.log('Add to cart', {
      productId: data.id,
      quantity: 1, // This would come from the ProductDetailSection state
    });
  };

  const handleBuyNow = () => {
    // Handle buy now logic
    console.log('Buy now', {
      productId: data.id,
      quantity: 1, // This would come from the ProductDetailSection state
    });
  };

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
    // Handle wishlist toggle logic
    console.log('Wishlist toggle', {
      productId: data.id,
      isWishlisted: !isWishlisted,
    });
  };

  const handleShareClick = () => {
    // Handle share logic
    if (navigator.share) {
      navigator
        .share({
          title: data.name,
          text: `Check out ${data.name}`,
          url: window.location.href,
        })
        .catch((error) => {
          console.error('Error sharing:', error);
        });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      console.log('Link copied to clipboard');
    }
  };

  return (
    <ProductDetailSection
      product={data}
      onAddToCart={handleAddToCart}
      onBuyNow={handleBuyNow}
      onWishlistClick={handleWishlistClick}
      onShareClick={handleShareClick}
      isWishlisted={isWishlisted}
    />
  );
};

// Export all components and types
export { ProductAdditionalInfo } from './product-additional-info';
export type { ProductAdditionalInfoProps } from './product-additional-info';

export { ProductActions } from './product-actions';
export type { ProductActionsProps } from './product-actions';

export { ProductHeader } from './product-header';
export type { ProductHeaderProps } from './product-header';

export { ImageCarousel, ProductImages } from './image-carousel';
export type { ImageCarouselProps, ProductImagesProps } from './image-carousel';

export { ProductOptions } from './product-options';
export type { ProductOptionsProps } from './product-options';

export type { ColorOption, ProductDetailData, SizeOption } from './types';
