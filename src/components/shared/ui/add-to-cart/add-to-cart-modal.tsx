'use client';

import Modal from '@/components/shared/modal';
import type { ProductDetailData, ResponsiveImages } from '@/types/response';
import { FC } from 'react';
import { MainProductPreview } from './main-product-preview';
import { SimilarProductsSection } from './similar-products-section';
import { AddToCartSuccessFooter } from './success-footer';

export interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetailData;
  mainVariantImage?: ResponsiveImages;
  onGoToCart?: () => void;
}

export const AddToCartModal: FC<AddToCartModalProps> = ({
  isOpen,
  onClose,
  product,
  mainVariantImage,
  onGoToCart,
}) => {
  const similarProducts = product.similar_products || [];

  return (
    <Modal
      variant="center"
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-5xl w-full"
    >
      <div className="flex flex-col h-full bg-white max-h-[90vh] overflow-y-auto rounded-lg">
        {/* Header */}
        {/* <div className="flex items-center justify-end px-4 py-2.5">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-deep-maroon text-white hover:bg-[#6b0000] transition-colors duration-200 shadow-md"
            aria-label="Close"
          >
            <FiX className="w-3 h-3" />
          </button>
        </div> */}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8 items-start">
            <div className="sticky top-0">
              <MainProductPreview
                images={mainVariantImage}
                alt={product.product_info.name}
              />
            </div>
            <SimilarProductsSection products={similarProducts} />
          </div>
        </div>

        <AddToCartSuccessFooter onContinue={onClose} onGoToCart={onGoToCart} />
      </div>
    </Modal>
  );
};
