'use client';

import Modal from '@/components/shared/modal';
import Swiper from '@/components/shared/swiper';
import ResponsiveImage from '@/components/shared/ui/responsive-image';
import type { ProductDetailData, ResponsiveImages } from '@/types/response';
import { startTransition, useEffect, useMemo, useState, type FC } from 'react';
import { FiBox, FiHeart, FiShare2 } from 'react-icons/fi';
import ImageCarouselModalView from './image-carousel-modal-view';

export interface ImageCarouselProps {
  images: ResponsiveImages[];
  alt?: string;
  discount?: number;
  showView3D?: boolean;
  onWishlistClick?: () => void;
  onShareClick?: () => void;
  isWishlisted?: boolean;
  productName: string;
}

export const ImageCarousel: FC<ImageCarouselProps> = ({
  images,
  alt = 'Product image',
  discount,
  showView3D = true,
  onWishlistClick,
  onShareClick,
  isWishlisted = false,
  productName,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageKey, setImageKey] = useState(0);

  // Modal state for viewing image in larger view
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleMainImageClick = () => {
    setIsModalOpen(true);
  };

  // Reset image key when images array changes to trigger fade effect
  // Using startTransition to batch state updates and suppress the warning
  useEffect(() => {
    startTransition(() => {
      setImageKey((prev) => prev + 1);
      setSelectedIndex(0);
    });
  }, [images]);

  // Handle empty images array
  if (!images || images.length === 0) {
    console.warn('ImageCarousel: No images available to display');
    return (
      <div className="relative w-full rounded-lg overflow-hidden bg-gray-100 mb-3">
        <div className="w-full h-96 flex items-center justify-center bg-gray-200">
          <span className="text-gray-500">No images available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Main Image Container (intrinsic height based on image) */}
      <div
        className="relative aspect-square w-full rounded-lg overflow-hidden mb-3 cursor-zoom-in"
        onClick={handleMainImageClick}
        tabIndex={0}
        role="button"
        aria-label="View image in modal"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleMainImageClick();
        }}
      >
        <ResponsiveImage
          key={`${imageKey}-${selectedIndex}`}
          images={images[selectedIndex]}
          alt={alt}
          className="w-full h-full aspect-auto"
          shouldFill
          objectFit="cover"
          layoutId="main-product-image"
          enableFadeTransition={true}
        />

        {/* Discount Badge */}
        {discount && discount > 0 ? (
          <div className="absolute top-4 left-4 bg-deep-maroon text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-md z-10">
            {discount}% OFF
          </div>
        ) : null}

        {/* Action Icons - Top Right */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            type="button"
            onClick={onWishlistClick}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Add to wishlist"
          >
            <FiHeart
              className={`w-5 h-5 transition-colors duration-200 ${
                isWishlisted
                  ? 'fill-deep-maroon text-deep-maroon'
                  : 'text-gray-700'
              }`}
            />
          </button>
          <button
            type="button"
            onClick={onShareClick}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Share product"
          >
            <FiShare2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* View in 3D Button */}
        {showView3D ? (
          <div className="absolute bottom-4 left-4 z-10">
            <button
              type="button"
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-medium text-xs md:text-sm hover:bg-white transition-all duration-200 shadow-md hover:shadow-lg"
              aria-label="View in 3D"
            >
              <FiBox className="w-4 h-4" />
              <span>View in 3D</span>
            </button>
          </div>
        ) : null}
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <Swiper
          gap={3}
          showNavigation={images.length > 4}
          hideArrowOnMobile={true}
          className="mt-2"
          alwaysAlignStart
        >
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleThumbnailClick(index)}
              className={`relative shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedIndex === index
                  ? 'border-deep-maroon ring-2 ring-deep-maroon/20'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <ResponsiveImage
                images={image}
                alt={`${alt} thumbnail ${index + 1}`}
                className="w-full h-full"
                shouldFill={false}
                objectFit="cover"
                enableFadeTransition={false}
              />
            </button>
          ))}
        </Swiper>
      )}

      {/* Modal for image view */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant="center"
        size="xl"
        className="p-0 bg-transparent shadow-none"
      >
        <ImageCarouselModalView
          images={images}
          initialIndex={selectedIndex}
          onClose={() => setIsModalOpen(false)}
          productName={productName}
        />
      </Modal>
    </div>
  );
};

export interface ProductImagesProps {
  product: ProductDetailData;
  selectedVariant: string;
  selectedFabric: string;
  selectedColor: string;
  onWishlistClick?: () => void;
  onShareClick?: () => void;
  isWishlisted?: boolean;
}

export const ProductImages: FC<ProductImagesProps> = ({
  product,
  selectedVariant,
  selectedFabric,
  selectedColor,
  onWishlistClick,
  onShareClick,
  isWishlisted = false,
}) => {
  // Extract responsive images from selected variant/fabric/color
  const images = useMemo(() => {
    const variant = product.variants.find((v) => v.name === selectedVariant);
    const fabric = variant?.fabricsList.find((f) => f.name === selectedFabric);
    const color = fabric?.colorsList.find(
      (c) => String(c.id) === selectedColor,
    );

    // Extract responsive images from the images array within color
    if (color?.images && color.images.length > 0) {
      const responsiveImages = color.images
        .map((img) => img.responsive_images)
        .filter((img): img is ResponsiveImages => Boolean(img));
      if (responsiveImages.length > 0) {
        return responsiveImages;
      }
      // Log error if images exist but responsive_images is missing
      console.error(
        `responsive_images field is missing for color: ${color.name} (ID: ${color.id}) in product: ${product.product_info.name}`,
      );
    } else {
      // Log error if color has no images at all
      console.error(
        `No images found for color: ${selectedColor} in product: ${product.product_info.name}`,
      );
    }

    return [];
  }, [product, selectedVariant, selectedFabric, selectedColor]);

  const discount = product.product_info.pricing.offer_percentage
    ? Math.round(parseFloat(product.product_info.pricing.offer_percentage))
    : 0;

  return (
    <ImageCarousel
      images={images}
      alt={product.product_info.name}
      discount={discount}
      showView3D={true}
      onWishlistClick={onWishlistClick}
      onShareClick={onShareClick}
      isWishlisted={isWishlisted}
      productName={product.product_info.name}
    />
  );
};
