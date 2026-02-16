'use client';

import Modal from '@/components/shared/modal';
import type { ProductDetailData } from '@/types/response';
import { FC, useMemo } from 'react';
import { FiX } from 'react-icons/fi';
import { MainProductPreview } from './main-product-preview';
import { SimilarProductsSection } from './similar-products-section';
import { AddToCartSuccessFooter } from './success-footer';

export interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetailData;
  onGoToCart?: () => void;
}

export const AddToCartModal: FC<AddToCartModalProps> = ({
  isOpen,
  onClose,
  product,
  onGoToCart,
}) => {
  const mainProductImage = useMemo(() => {
    return (
      product.product_info.responsive_images || {
        web: {
          url: product.product_info.thumbnail_image,
        },
      }
    );
  }, [
    product.product_info.responsive_images,
    product.product_info.thumbnail_image,
  ]);

  const similarProducts = product.similar_products || [];

  return (
    <Modal
      variant="center"
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-5xl w-full"
    >
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="flex items-center justify-end px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Close"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8 items-start">
            <MainProductPreview
              images={mainProductImage}
              alt={product.product_info.name}
            />
            <SimilarProductsSection products={similarProducts} />
          </div>
        </div>

        <AddToCartSuccessFooter onContinue={onClose} onGoToCart={onGoToCart} />
      </div>
    </Modal>
  );
};
