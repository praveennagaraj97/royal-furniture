'use client';

import type { ProductDetailData, ResponsiveImages } from '@/types/response';
import { FC, Fragment, ReactNode, useState } from 'react';
import { AddToCartModal } from './add-to-cart-modal';

export interface AddToCartWrapperProps {
  children: ReactNode;
  product: ProductDetailData;
  mainVariantImage?: ResponsiveImages;
  onGoToCart?: () => void;
  onOpen?: () => void;
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

          // Open the modal immediately so the wrapper isn't unmounted
          // while awaiting any async onOpen action (e.g. addItem).
          setOpen(true);

          if (onOpen) {
            try {
              // Call onOpen but do not rely on it to control modal visibility.
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const result = (onOpen as any)();
              if (result && typeof result.then === 'function') {
                await result;
              }
            } catch (err) {
              // swallow errors to avoid breaking UX
              console.error('[AddToCartWrapper] onOpen failed', err);
            }
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
