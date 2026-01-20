'use client';

import { ViewOnce } from '@/components/shared/animations';
import AddToWishlistModal from '@/components/user/wishlist/add-to-wishlist-modal';
import { useIntersectionObserver } from '@/hooks';
import { useWishlistActions } from '@/hooks/use-wishlist-actions';
import type { ProductDetailData } from '@/types/response';
import { startTransition, useEffect, useRef, useState, type FC } from 'react';
import { FiChevronRight, FiShoppingCart } from 'react-icons/fi';
import { IoStorefront } from 'react-icons/io5';
import { GeneralInformation } from './general-information';
import { ProductImages } from './image-carousel';
import { PaymentDeliveryInfo } from './payment-delivery-info';
import { ProductActions } from './product-actions';
import { ProductAdditionalInfo } from './product-additional-info';
import { ProductHeader } from './product-header';
import { ProductOptions } from './product-options';
import StoreLocatorModal from './store-locator-modal';
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
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  const isActionsVisible = useIntersectionObserver({
    ref: actionsRef,
    options: { threshold: 0 },
  });
  const { removeFromWishlist } = useWishlistActions();

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

  const handleWishlistClick = async () => {
    if (!currentColor?.variant_id) return;

    if (isWishlisted) {
      // Remove from wishlist
      try {
        await removeFromWishlist(currentColor.variant_id);
        setIsWishlisted(false);
      } catch {
        // Error is handled in the hook with toast
      }
    } else {
      // Show modal to select collection
      setIsWishlistModalOpen(true);
    }
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
          <div className="min-w-0 w-full lg:sticky top-20">
            <ProductImages
              product={data}
              selectedVariant={selectedVariant}
              selectedFabric={selectedFabric}
              selectedColor={selectedColor}
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
                  onClick={() => setIsStoreLocatorOpen(true)}
                  className="w-full flex items-center justify-between p-4 bg-deep-maroon/10 rounded-lg transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-2">
                    <IoStorefront className="text-xl text-deep-maroon" />

                    <span className="font-semibold text-xs md:text-sm text-gray-900">
                      Try in store!
                    </span>
                  </div>
                  <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-deep-maroon transition-colors" />
                </button>
              </ViewOnce>

              <GeneralInformation
                description={data.general_information}
                infoSection={currentColor?.info_section}
              />
            </div>
            <div className="space-y-4">
              <div ref={actionsRef}>
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

      <br />
      <UserReviews />

      {/* Add to Wishlist Modal */}
      {currentColor?.variant_id && (
        <AddToWishlistModal
          isOpen={isWishlistModalOpen}
          onClose={() => setIsWishlistModalOpen(false)}
          variantId={currentColor.variant_id}
          productId={data.product_info.id}
          onSuccess={() => setIsWishlisted(true)}
        />
      )}

      {/* Store Locator Modal */}
      <StoreLocatorModal
        isOpen={isStoreLocatorOpen}
        onClose={() => setIsStoreLocatorOpen(false)}
      />

      {/* Floating Add to Cart Bubble */}
      {!isActionsVisible && (
        <button
          type="button"
          onClick={handleAddToCart}
          className="fixed bottom-6 right-6 w-14 h-14 bg-deep-maroon text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-50"
          aria-label="Add to Cart"
        >
          <FiShoppingCart className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
