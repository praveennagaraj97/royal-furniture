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
}

const AddToCartWrapper: FC<AddToCartWrapperProps> = ({
  children,
  product,
  mainVariantImage,
  onGoToCart,
  onOpen,
}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Fragment>
      <div
        onClick={async () => {
          if (onOpen) {
            try {
              // Await if onOpen returns a promise
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const result = (onOpen as any)();
              if (result && typeof result.then === 'function') {
                await result;
              }
            } catch (err) {
              // swallow errors so modal still opens

              console.error('[AddToCartWrapper] onOpen failed', err);
            }
          }
          setOpen(true);
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
