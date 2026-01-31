'use client';

import ImageSwipeCarousel from '@/components/shared/image-carousel-slideshow';
import Modal from '@/components/shared/modal';
import Swiper from '@/components/shared/swiper';
import ResponsiveImage from '@/components/shared/ui/responsive-image';
import type { ProductDetailData, ResponsiveImages } from '@/types/response';
import { startTransition, useEffect, useMemo, useState, type FC } from 'react';
import { FiBox, FiShare2 } from 'react-icons/fi';
import AddToWishList from '../add-to-wishlist';
import ImageCarouselModalView from './modal-view';

interface ImageCardProps {
  img: ResponsiveImages;
  idx: number;
  onClick?: () => void;
  isActive?: boolean;
  alt: string;
  discount?: number;
  showView3D?: boolean;
  onWishlistClick?: () => void;
  onShareClick?: () => void;
  isWishlisted?: boolean;
}

const ImageCard: FC<ImageCardProps> = ({
  img,
  onClick,
  alt,
  discount,
  showView3D,
  onShareClick,
  idx,
}) => {
  return (
    <div
      className="relative aspect-square w-full rounded-lg overflow-hidden mb-3 cursor-zoom-in"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <ResponsiveImage
        images={img}
        alt={alt}
        className="w-full h-full"
        shouldFill
        objectFit="cover"
        layoutId="main-product-image"
        enableFadeTransition
        key={`${idx}-${img.web?.url || img.mobile?.url || img.ipad?.url || 'default'}`}
      />

      {discount ? (
        <div className="absolute top-4 left-4 bg-deep-maroon text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-md z-10">
          {discount}% OFF
        </div>
      ) : null}

      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <AddToWishList />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onShareClick?.();
          }}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
        >
          <FiShare2 className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {showView3D && (
        <div className="absolute bottom-4 left-4 z-10">
          <button
            type="button"
            className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-lg text-xs md:text-sm shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <FiBox className="w-4 h-4" />
            View in 3D
          </button>
        </div>
      )}
    </div>
  );
};

// ======================= ImageCarousel =======================

export interface ImageCarouselProps {
  images: ResponsiveImages[];
  alt?: string;
  discount?: number;
  showView3D?: boolean;
  onShareClick?: () => void;
  isWishlisted?: boolean;
  productName: string;
}

export const ImageCarousel: FC<ImageCarouselProps> = ({
  images,
  alt = 'Product image',
  discount,
  showView3D = true,
  onShareClick,
  isWishlisted = false,
  productName,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reset index when images change
  useEffect(() => {
    startTransition(() => {
      setSelectedIndex(0);
    });
  }, [images]);

  // Edge case safety
  useEffect(() => {
    startTransition(() => {
      if (selectedIndex >= images.length) {
        setSelectedIndex(0);
      }
    });
  }, [images, selectedIndex]);

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full rounded-lg overflow-hidden bg-gray-100 md:mb-3">
        <div className="w-full h-96 flex items-center justify-center bg-gray-200">
          <span className="text-gray-500">No images available</span>
        </div>
      </div>
    );
  }

  const handleMainImageClick = () => setIsModalOpen(true);

  return (
    <div className="relative w-full">
      {/* Mobile */}
      <div className="block md:hidden">
        <ImageSwipeCarousel
          images={images.map((img, idx) => (
            <ImageCard
              key={idx}
              img={img}
              idx={idx}
              onClick={handleMainImageClick}
              alt={alt}
              discount={discount}
              showView3D={showView3D}
              onShareClick={onShareClick}
              isWishlisted={isWishlisted}
            />
          ))}
        />
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <ImageCard
          img={images[selectedIndex]}
          idx={selectedIndex}
          onClick={handleMainImageClick}
          alt={alt}
          discount={discount}
          showView3D={showView3D}
          onShareClick={onShareClick}
          isWishlisted={isWishlisted}
        />

        {images.length > 1 && (
          <Swiper
            gap={3}
            showNavigation={images.length > 4}
            hideArrowOnMobile
            className="mt-2"
            alwaysAlignStart
          >
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`relative shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 ${
                  selectedIndex === index
                    ? 'border-deep-maroon ring-2 ring-deep-maroon/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <ResponsiveImage
                  images={image}
                  alt={`${alt} thumbnail ${index + 1}`}
                  className="w-full h-full"
                  objectFit="cover"
                />
              </button>
            ))}
          </Swiper>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant="center"
        size="xl"
        className="p-0 bg-transparent shadow-none "
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

// ======================= ProductImages =======================

export interface ProductImagesProps {
  product: ProductDetailData;
  selectedVariant: string;
  selectedFabric: string;
  selectedColor: string;
  onShareClick?: () => void;
  isWishlisted?: boolean;
}

export const ProductImages: FC<ProductImagesProps> = ({
  product,
  selectedVariant,
  selectedFabric,
  selectedColor,
  onShareClick,
  isWishlisted = false,
}) => {
  const images = useMemo(() => {
    const variant = product.variants.find((v) => v.name === selectedVariant);
    const fabric = variant?.fabricsList.find((f) => f.name === selectedFabric);
    const color = fabric?.colorsList.find(
      (c) => String(c.id) === selectedColor,
    );

    if (color?.images?.length) {
      return color.images
        .map((img) => img.responsive_images)
        .filter(Boolean) as ResponsiveImages[];
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
      showView3D
      onShareClick={onShareClick}
      isWishlisted={isWishlisted}
      productName={product.product_info.name}
    />
  );
};
