'use client';

import type { ProductItem, ResponsiveImages } from '@/types/response';
import { FC, Fragment, ReactNode, useState } from 'react';
import { AddToCartModal } from './add-to-cart-modal';

export interface AddToCartModalProduct {
  product_info: {
    name: string;
  };
  similar_products: ProductItem[];
}

export interface AddToCartWrapperProps {
  children: ReactNode;
  product: AddToCartModalProduct;
  mainVariantImage?: ResponsiveImages;
  onGoToCart?: () => void;
  onOpen?: () => void | boolean | Promise<void | boolean>;
  disableOpen?: boolean;
}

const AddToCartWrapper: FC<AddToCartWrapperProps> = ({
  children,
  product,
  mainVariantImage,
  onGoToCart,
  onOpen,
  disableOpen,
}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Fragment>
      <div
        onClick={async () => {
          if (disableOpen) return;
          try {
            let shouldOpen = true;
            if (onOpen) {
              const result = await onOpen();
              if (result === false) {
                shouldOpen = false;
              }
            }

            if (shouldOpen) {
              setOpen(true);
            }
          } catch (err) {
            // do not open success modal on failure
            console.error('[AddToCartWrapper] onOpen failed', err);
          }
        }}
      >
        {children}
      </div>
      <AddToCartModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        product={product}
        mainVariantImage={mainVariantImage}
        onGoToCart={onGoToCart}
      />
    </Fragment>
  );
};

export default AddToCartWrapper;
