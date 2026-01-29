'use client';

import { ViewOnce } from '@/components/shared/animations';
import type { ProductDetailData } from '@/types/response';
import { startTransition, useEffect, useState, type FC } from 'react';
import { GeneralInformation } from './general-information';
import { ProductImages } from './image-carousel';
import { PaymentDeliveryInfo } from './payment-delivery-info';
import { ProductActions } from './product-actions';
import { ProductAdditionalInfo } from './product-additional-info';
import { ProductHeader } from './product-header';
import { ProductOptions } from './product-options';
import { UserReviews } from './user-reviews';

export interface ProductDetailProps {
  data: ProductDetailData;
}

export const ProductDetail: FC<ProductDetailProps> = ({ data }) => {
  // Get first variant, fabric, and color for initial state
  const firstVariant = data.variants[0];
  const firstFabric = firstVariant?.fabricsList[0];
  const firstColor = firstFabric?.colorsList[0];

  const [isWishlisted, setIsWishlisted] = useState(
    firstColor?.is_wishlist || false,
  );
  const [selectedVariant, setSelectedVariant] = useState(
    firstVariant?.name || '',
  );
  const [selectedFabric, setSelectedFabric] = useState(firstFabric?.name || '');
  const [selectedColor, setSelectedColor] = useState(
    String(firstColor?.id || ''),
  );
  const [quantity, setQuantity] = useState(1);

  // Get current selected color variant
  const currentVariant = data.variants.find((v) => v.name === selectedVariant);
  const currentFabric = currentVariant?.fabricsList.find(
    (f) => f.name === selectedFabric,
  );
  const currentColor = currentFabric?.colorsList.find(
    (c) => String(c.id) === selectedColor,
  );

  // Update wishlist state when color changes
  useEffect(() => {
    if (currentColor) {
      startTransition(() => {
        setIsWishlisted(currentColor.is_wishlist || false);
      });
    }
  }, [currentColor]);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    if (currentColor?.stock) {
      setQuantity(Math.min(newQuantity, currentColor.stock));
    } else {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Handle add to cart logic
    console.log('Add to cart', {
      productId: data.product_info.id,
      quantity,
      selectedColor,
      selectedVariant,
      selectedFabric,
    });
  };

  const handleBuyNow = () => {
    // Handle buy now logic
    console.log('Buy now', {
      productId: data.product_info.id,
      quantity,
      selectedColor,
      selectedVariant,
      selectedFabric,
    });
  };

  const handleShareClick = () => {
    // Handle share logic
    if (navigator.share) {
      navigator
        .share({
          title: data.product_info.name,
          text: `Check out ${data.product_info.name}`,
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
    <div className="w-full">
      {/* Mobile/Tablet Layout - Single Column */}
      <div className="lg:hidden">
        <div className="relative w-full">
          {/* Image Carousel - Full Width at Top */}
          <ViewOnce
            type="slideUp"
            distance={30}
            duration={0.6}
            delay={0.1}
            amount={0.01}
            margin="-100px"
          >
            <div className="w-full px-3 sm:px-4">
              <ProductImages
                product={data}
                selectedVariant={selectedVariant}
                selectedFabric={selectedFabric}
                selectedColor={selectedColor}
                onShareClick={handleShareClick}
                isWishlisted={isWishlisted}
              />
            </div>
          </ViewOnce>

          {/* Product Details - Stacked Below Image */}
          <ViewOnce
            type="slideUp"
            distance={30}
            duration={0.6}
            delay={0.2}
            amount={0.01}
            margin="-100px"
          >
            <div className="w-full space-y-4 px-3 sm:px-4 py-4">
              {/* Product Header */}
              <ProductHeader product={data} />

              {/* Payment Plans Only (Tabby & Tamara) - Moved above options on mobile */}
              <div className="sm:hidden">
                <PaymentDeliveryInfo
                  productPrice={
                    currentColor?.region_prices.offer_price
                      ? parseFloat(currentColor.region_prices.offer_price)
                      : data.product_info.pricing.offer_price
                        ? parseFloat(data.product_info.pricing.offer_price)
                        : 0
                  }
                  deliveryInfo={data.delivery_info}
                  flexiPayment={data.flexi_payment}
                  paymentOptions={data.payment_options}
                  freeAssembly={data.free_assembly}
                  expressDeliveryTimer={data.express_delivery_timer}
                  showOnlyPlanCards
                />
              </div>

              {/* Product Options (Variant, Fabric, Color, Quantity) */}
              <ProductOptions
                product={data}
                selectedVariant={selectedVariant}
                selectedFabric={selectedFabric}
                selectedColor={selectedColor}
                quantity={quantity}
                onVariantChange={setSelectedVariant}
                onFabricChange={setSelectedFabric}
                onColorChange={setSelectedColor}
                onQuantityChange={handleQuantityChange}
              />

              {/* Customize Yours */}
              <ProductAdditionalInfo product={data} />

              {/* General Information */}
              <GeneralInformation
                description={data.general_information}
                infoSection={currentColor?.info_section}
              />

              {/* Payment & Delivery Info (Ways of Payment section) */}
              <PaymentDeliveryInfo
                productPrice={
                  currentColor?.region_prices.offer_price
                    ? parseFloat(currentColor.region_prices.offer_price)
                    : data.product_info.pricing.offer_price
                      ? parseFloat(data.product_info.pricing.offer_price)
                      : 0
                }
                deliveryInfo={data.delivery_info}
                flexiPayment={data.flexi_payment}
                paymentOptions={data.payment_options}
                freeAssembly={data.free_assembly}
                expressDeliveryTimer={data.express_delivery_timer}
              />

              {/* Product Actions - Add to Cart */}

              <ProductActions
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            </div>
          </ViewOnce>
        </div>
      </div>

      {/* Desktop Layout - Two Column | Hidden on Mobile */}
      <div className="hidden lg:block section-container">
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
            <div className="min-w-0 w-full lg:sticky top-20">
              <ProductImages
                product={data}
                selectedVariant={selectedVariant}
                selectedFabric={selectedFabric}
                selectedColor={selectedColor}
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
            <div className="min-w-0 w-full grid 2xl:grid-cols-2 gap-4">
              <div className="space-y-4">
                <ProductHeader product={data} />
                <ProductOptions
                  product={data}
                  selectedVariant={selectedVariant}
                  selectedFabric={selectedFabric}
                  selectedColor={selectedColor}
                  quantity={quantity}
                  onVariantChange={setSelectedVariant}
                  onFabricChange={setSelectedFabric}
                  onColorChange={setSelectedColor}
                  onQuantityChange={handleQuantityChange}
                />

                <GeneralInformation
                  description={data.general_information}
                  infoSection={currentColor?.info_section}
                />
              </div>
              <div className="space-y-4">
                <div>
                  <ProductActions
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                  />
                </div>

                <ProductAdditionalInfo product={data} />
                <PaymentDeliveryInfo
                  productPrice={
                    currentColor?.region_prices.offer_price
                      ? parseFloat(currentColor.region_prices.offer_price)
                      : data.product_info.pricing.offer_price
                        ? parseFloat(data.product_info.pricing.offer_price)
                        : 0
                  }
                  deliveryInfo={data.delivery_info}
                  flexiPayment={data.flexi_payment}
                  paymentOptions={data.payment_options}
                  freeAssembly={data.free_assembly}
                  expressDeliveryTimer={data.express_delivery_timer}
                />
              </div>
            </div>
          </ViewOnce>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-4 section-container">
        <UserReviews />
      </div>
    </div>
  );
};
