'use client';

import { ViewOnce } from '@/components/shared/animations';
import { useCart } from '@/contexts/cart-context';
import { useGetProductDetail } from '@/hooks/api/use-get-product-detail';
import { useAppRouter } from '@/hooks/use-navigation';
import type { CartItem } from '@/types/cart';
import type { ProductDetailData } from '@/types/response';
import { startTransition, useEffect, useState, type FC } from 'react';
import { GeneralInformation } from './general-information';
import { ProductHelpCard, ProductNoteCard } from './help-cards';
import { ProductImages } from './image-carousel';
import { PaymentDeliveryInfo } from './payment-delivery-info';
import { ProductActions } from './product-actions';
import { ProductAdditionalInfo } from './product-additional-info';
import { ProductHeader } from './product-header';
import { ProductOptions } from './product-options';

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

  const { addItem, items: cartItems } = useCart();
  const { push } = useAppRouter();

  const [isAdding, setIsAdding] = useState(false);

  // Use client hook to get live product data (SWR). Fall back to server `data`.
  const {
    product: liveProduct,
    isVariantWishlisted,
    mutate,
  } = useGetProductDetail({
    productSlug: data.product_info.slug,
    enabled: Boolean(data.product_info.slug),
  });
  const productForUI = liveProduct || data;

  // Helper to update the product-detail cache for a specific variant's wishlist flag
  const updateVariantWishlist = (variantId: number, value: boolean) => {
    try {
      mutate?.((current) => {
        if (!current) return current;
        const copy = JSON.parse(JSON.stringify(current));
        const product = copy.data;
        for (const variantGroup of product.variants || []) {
          for (const fabric of variantGroup.fabricsList || []) {
            for (const color of fabric.colorsList || []) {
              if (color.variant_id === variantId) {
                color.is_wishlist = value;
              }
            }
          }
        }
        return copy;
      }, false);
    } catch (err) {
      // swallow
    }
  };

  // Get current selected color variant
  const currentVariant = data.variants.find((v) => v.name === selectedVariant);
  const currentFabric = currentVariant?.fabricsList.find(
    (f) => f.name === selectedFabric,
  );
  const currentColor = currentFabric?.colorsList.find(
    (c) => String(c.id) === selectedColor,
  );
  const mainVariantImage = currentColor?.images?.[0]?.responsive_images;

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

  const handleAddToCart = async () => {
    // Add item to cart (uses cart context which syncs with server for guests)

    const id = currentColor?.sku ?? String(productForUI.product_info.id);
    const price = parseFloat(
      currentColor?.region_prices?.offer_price ||
        data.product_info.pricing.offer_price ||
        '0',
    );
    const basePrice = currentColor?.region_prices?.base_price
      ? parseFloat(currentColor.region_prices.base_price)
      : data.product_info.pricing.base_price
        ? parseFloat(data.product_info.pricing.base_price as string)
        : undefined;

    const item: CartItem = {
      id: String(id),
      name: data.product_info.name,
      slug: data.product_info.slug,
      description: undefined,
      color: currentColor?.name || undefined,
      image: mainVariantImage || {},
      price: isNaN(price) ? 0 : price,
      basePrice: basePrice,
      quantity,
      attributes: [selectedVariant, selectedFabric].filter(Boolean) as string[],
    };

    setIsAdding(true);
    try {
      await addItem(item);
    } catch {
      // swallow error; addItem already logged
    } finally {
      setIsAdding(false);
    }
  };

  // Determine if current selected SKU is in cart
  const currentId = currentColor?.sku ?? String(productForUI.product_info.id);
  const isInCart = cartItems.some((ci) => String(ci.id) === String(currentId));

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
            margin="-40px"
          >
            <div className="w-full px-3 sm:px-4">
              <ProductImages
                product={data}
                selectedVariant={selectedVariant}
                selectedFabric={selectedFabric}
                selectedColor={selectedColor}
                onShareClick={handleShareClick}
                isWishlisted={isWishlisted}
                isVariantWishlisted={isVariantWishlisted}
                updateVariantWishlist={updateVariantWishlist}
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
            margin="-40px"
          >
            <div className="w-full space-y-4 px-3 sm:px-4 py-4">
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

              {/* Help & Note Cards */}
              <ProductNoteCard
                className="mt-4"
                productName={data.product_info.name}
              />

              {/* Product Actions - Add to Cart */}
              <ProductActions
                product={productForUI}
                mainVariantImage={mainVariantImage}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                isInCart={isInCart}
                onGoToCart={() => push('/checkout/cart')}
                isAdding={isAdding}
              />

              <ProductHelpCard />

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
            </div>
          </ViewOnce>
        </div>
      </div>

      {/* Desktop Layout - Three Column | Hidden on Mobile */}
      <div className="hidden lg:block section-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_0.5fr] gap-4 items-start">
          {/* Left Side (40%) - Image Carousel (Sticky) */}
          <div className="lg:sticky top-20">
            <ViewOnce
              type="slideUp"
              distance={30}
              duration={0.6}
              delay={0.1}
              amount={0.01}
              margin="-40px"
            >
              <div className="min-w-0 w-full">
                <ProductImages
                  product={data}
                  selectedVariant={selectedVariant}
                  selectedFabric={selectedFabric}
                  selectedColor={selectedColor}
                  onShareClick={handleShareClick}
                  isWishlisted={isWishlisted}
                  isVariantWishlisted={isVariantWishlisted}
                  updateVariantWishlist={updateVariantWishlist}
                />
              </div>
            </ViewOnce>
          </div>

          {/* Middle Side (30%) - Product Details */}
          <ViewOnce
            type="slideUp"
            distance={30}
            duration={0.6}
            delay={0.2}
            amount={0.01}
            margin="-40px"
          >
            <div className="w-full space-y-4">
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
              <ProductNoteCard
                className="mt-4"
                productName={data.product_info.name}
              />
              <ProductHelpCard />
            </div>
          </ViewOnce>

          {/* Right Side (20%) - Actions & Info */}
          <ViewOnce
            type="slideUp"
            distance={30}
            duration={0.6}
            delay={0.2}
            amount={0.01}
            margin="-40px"
          >
            <div className="w-full space-y-4">
              <div>
                <ProductActions
                  product={data}
                  mainVariantImage={mainVariantImage}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                  isInCart={isInCart}
                  onGoToCart={() => push('/checkout/cart')}
                  isAdding={isAdding}
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
          </ViewOnce>
        </div>
      </div>
    </div>
  );
};
