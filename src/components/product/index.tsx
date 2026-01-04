'use client';

import { ViewOnce } from '@/components/shared/animations';
import { useState, type FC } from 'react';
import { GeneralInformation } from './general-information';
import { ProductImages } from './image-carousel';
import { PaymentDeliveryInfo } from './payment-delivery-info';
import { ProductActions } from './product-actions';
import { ProductAdditionalInfo } from './product-additional-info';
import { ProductHeader } from './product-header';
import { ProductOptions } from './product-options';
import type { ProductDetailData } from './types';

export interface ProductDetailProps {
  data: ProductDetailData;
}

export interface ProductDetailProps {
  data: ProductDetailData;
}

export const ProductDetail: FC<ProductDetailProps> = ({ data }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(data.colors[0]?.id || '');
  const [selectedSize, setSelectedSize] = useState(data.sizes[0]?.id || '');
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    if (data.stockCount) {
      setQuantity(Math.min(newQuantity, data.stockCount));
    } else {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Handle add to cart logic
    console.log('Add to cart', {
      productId: data.id,
      quantity,
      selectedColor,
      selectedSize,
    });
  };

  const handleBuyNow = () => {
    // Handle buy now logic
    console.log('Buy now', {
      productId: data.id,
      quantity,
      selectedColor,
      selectedSize,
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
    <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Image Carousel */}
        <ViewOnce
          type="slideUp"
          distance={30}
          duration={0.6}
          delay={0.1}
          amount={0.01}
          margin="-100px"
        >
          <div className="min-w-0 w-full">
            <ProductImages
              product={data}
              onWishlistClick={handleWishlistClick}
              onShareClick={handleShareClick}
              isWishlisted={isWishlisted}
            />
          </div>
        </ViewOnce>

        {/* Right Side - Product Details */}
        <ViewOnce
          type="slideUp"
          distance={30}
          duration={0.6}
          delay={0.2}
          amount={0.01}
          margin="-100px"
        >
          <div className="min-w-0 w-full space-y-4">
            <ProductHeader product={data} />
            <ProductOptions
              product={data}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              quantity={quantity}
              onColorChange={setSelectedColor}
              onSizeChange={setSelectedSize}
              onQuantityChange={handleQuantityChange}
            />
            <ProductActions
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
            <ProductAdditionalInfo product={data} />

            <PaymentDeliveryInfo productPrice={data.price} />
            <GeneralInformation />
          </div>
        </ViewOnce>
      </div>
    </div>
  );
};
