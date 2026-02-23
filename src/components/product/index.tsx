'use client';

import { ViewOnce } from '@/components/shared/animations';
import ProductListing from '@/components/shared/ui/product-listing';
import { useProductDetail } from '@/hooks/use-product-detail';
import type { ProductDetailData } from '@/types/response';
import type { FC } from 'react';
import { GeneralInformation } from './general-information';
import { ProductHelpCard, ProductNoteCard } from './help-cards';
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
  const { product, selection, options, wishlist, cart, share } =
    useProductDetail(data);
  const isOutOfStock = Boolean(
    selection.currentColor && selection.currentColor.stock !== undefined
      ? selection.currentColor.stock <= 0
      : false,
  );

  return (
    <div className="w-full">
      {/* Mobile/Tablet Layout - Single Column */}
      <div className="lg:hidden">
        <div className="relative w-full">
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
                selectedVariant={options.selectedVariant}
                selectedFabric={options.selectedFabric}
                selectedColor={options.selectedColor}
                onShareClick={share.handleShareClick}
                isWishlisted={wishlist.isWishlisted}
                isVariantWishlisted={wishlist.isVariantWishlisted}
                updateVariantWishlist={wishlist.updateVariantWishlist}
              />
            </div>
          </ViewOnce>

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

              <div className="sm:hidden">
                <PaymentDeliveryInfo
                  productPrice={selection.productPriceForPlans}
                  deliveryInfo={data.delivery_info}
                  flexiPayment={data.flexi_payment}
                  paymentOptions={data.payment_options}
                  freeAssembly={data.free_assembly}
                  expressDeliveryTimer={data.express_delivery_timer}
                  showOnlyPlanCards
                />
              </div>

              <ProductOptions
                product={data}
                selectedVariant={options.selectedVariant}
                selectedFabric={options.selectedFabric}
                selectedColor={options.selectedColor}
                quantity={options.quantity}
                onVariantChange={options.setSelectedVariant}
                onFabricChange={options.setSelectedFabric}
                onColorChange={options.setSelectedColor}
                onQuantityChange={options.handleQuantityChange}
              />

              <ProductAdditionalInfo product={data} />

              <GeneralInformation
                description={data.general_information}
                infoSection={selection.currentColor?.info_section}
              />

              <ProductNoteCard
                className="mt-4"
                productName={data.product_info.name}
              />

              <ProductActions
                product={product}
                mainVariantImage={selection.mainVariantImage}
                onAddToCart={cart.actions.handleAddToCart}
                onBuyNow={cart.actions.handleBuyNow}
                isInCart={cart.status.isInCart}
                onGoToCart={cart.actions.handleGoToCart}
                isAdding={cart.status.isAdding}
              />

              <ProductHelpCard />

              <PaymentDeliveryInfo
                productPrice={selection.productPriceForPlans}
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

      {/* Desktop Layout */}
      <div className="hidden lg:block section-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_0.5fr] gap-4 items-start">
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
                  selectedVariant={options.selectedVariant}
                  selectedFabric={options.selectedFabric}
                  selectedColor={options.selectedColor}
                  onShareClick={share.handleShareClick}
                  isWishlisted={wishlist.isWishlisted}
                  isVariantWishlisted={wishlist.isVariantWishlisted}
                  updateVariantWishlist={wishlist.updateVariantWishlist}
                />
              </div>
            </ViewOnce>
          </div>

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
                selectedVariant={options.selectedVariant}
                selectedFabric={options.selectedFabric}
                selectedColor={options.selectedColor}
                quantity={options.quantity}
                onVariantChange={options.setSelectedVariant}
                onFabricChange={options.setSelectedFabric}
                onColorChange={options.setSelectedColor}
                onQuantityChange={options.handleQuantityChange}
              />

              <GeneralInformation
                description={data.general_information}
                infoSection={selection.currentColor?.info_section}
              />
              <ProductNoteCard
                className="mt-4"
                productName={data.product_info.name}
              />
              <ProductHelpCard />
            </div>
          </ViewOnce>

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
                  product={product}
                  mainVariantImage={selection.mainVariantImage}
                  onAddToCart={cart.actions.handleAddToCart}
                  onBuyNow={cart.actions.handleBuyNow}
                  isInCart={cart.status.isInCart}
                  onGoToCart={cart.actions.handleGoToCart}
                  isAdding={cart.status.isAdding}
                  isOutOfStock={isOutOfStock}
                />
              </div>

              <ProductAdditionalInfo product={data} />
              <PaymentDeliveryInfo
                productPrice={selection.productPriceForPlans}
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

      {/* Product-related sections below the main detail */}
      {(product.frequently_bought_together.length > 0 ||
        product.similar_products.length > 0 ||
        product.you_may_also_like.length > 0) && (
        <div className="py-6 space-y-6 section-container">
          {product.frequently_bought_together.length > 0 && (
            <ProductListing
              title="Complete the Collection"
              products={product.frequently_bought_together || []}
            />
          )}

          {/* Reviews must come right after frequently bought items */}
          <UserReviews
            productSlug={product.product_info.slug}
            canReview={product.reviews_summary?.can_review ?? false}
            productName={product.product_info.name}
            productImage={
              product.product_info.responsive_images?.web?.url ||
              product.product_info.thumbnail_image
            }
          />
          <br />

          {product.similar_products.length > 0 && (
            <ProductListing
              title="Similar Products"
              products={product.similar_products || []}
            />
          )}

          {product.you_may_also_like.length > 0 && (
            <ProductListing
              title="You May Also Like"
              products={product.you_may_also_like || []}
            />
          )}
        </div>
      )}
    </div>
  );
};
