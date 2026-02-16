'use client';

import type { ProductDetailData, ResponsiveImages } from '@/types/response';
import { FC, Fragment, ReactNode, useState } from 'react';
import { AddToCartModal } from './add-to-cart-modal';

export interface AddToCartWrapperProps {
  children: ReactNode;
  product: ProductDetailData;
  mainVariantImage?: ResponsiveImages;
  onGoToCart?: () => void;
}

const AddToCartWrapper: FC<AddToCartWrapperProps> = ({
  children,
  product,
  mainVariantImage,
  onGoToCart,
}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Fragment>
      <div onClick={() => setOpen(true)}>{children}</div>
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
