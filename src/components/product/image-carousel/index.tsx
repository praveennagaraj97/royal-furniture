'use client';

import Swiper from '@/components/shared/swiper';
import ResponsiveImage from '@/components/shared/ui/responsive-image';
import type { ProductDetailData, ResponsiveImages } from '@/types/response';
import { useMemo, useState, type FC } from 'react';
import { FiBox, FiHeart, FiShare2 } from 'react-icons/fi';

export interface ImageCarouselProps {
  images: Array<string | ResponsiveImages>;
  alt?: string;
  discount?: number;
  showView3D?: boolean;
  onWishlistClick?: () => void;
  onShareClick?: () => void;
  isWishlisted?: boolean;
}

export const ImageCarousel: FC<ImageCarouselProps> = ({
  images,
  alt = 'Product image',
  discount,
  showView3D = true,
  onWishlistClick,
  onShareClick,
  isWishlisted = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  function toResponsive(item?: string | ResponsiveImages) {
    if (!item) return undefined;
    // if already a ResponsiveImages object, return as-is
    if (typeof item !== 'string' && (item as ResponsiveImages).web) {
      return item as ResponsiveImages;
    }
    const url = typeof item === 'string' ? item : undefined;
    if (!url) return undefined;
    return {
      web: { url },
      ipad: { url },
      mobile: { url },
    } as ResponsiveImages;
  }

  return (
    <div className="relative w-full">
      {/* Main Image Container (intrinsic height based on image) */}
      <div className="relative w-full rounded-lg overflow-hidden bg-gray-100 mb-3">
        <ResponsiveImage
          images={toResponsive(images[selectedIndex] || images[0])}
          alt={`${alt}`}
          className="object-cover"
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
                images={toResponsive(image)}
                alt={`${alt} thumbnail ${index + 1}`}
                className="object-cover"
              />
            </button>
          ))}
        </Swiper>
      )}
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
  // Extract images from selected variant/fabric/color
  const images = useMemo(() => {
    const variant = product.variants.find((v) => v.name === selectedVariant);
    const fabric = variant?.fabricsList.find((f) => f.name === selectedFabric);
    const color = fabric?.colorsList.find(
      (c) => String(c.id) === selectedColor,
    );

    if (color?.images && color.images.length > 0) {
      return color.images;
    }

    // Fallback to first available images
    const firstVariant = product.variants[0];
    const firstFabric = firstVariant?.fabricsList[0];
    const firstColor = firstFabric?.colorsList[0];

    return firstColor?.images || [product.product_info.thumbnail_image];
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
    />
  );
};
