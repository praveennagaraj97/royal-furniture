'use client';

import type { ProductDetailData } from '@/types/response';
import { FC, Fragment, ReactNode, useState } from 'react';
import { AddToCartModal } from './add-to-cart-modal';

export interface AddToCartWrapperProps {
  children: ReactNode;
  product: ProductDetailData;
  onGoToCart?: () => void;
}

const AddToCartWrapper: FC<AddToCartWrapperProps> = ({
  children,
  product,
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
        onGoToCart={onGoToCart}
      />
    </Fragment>
  );
};

export default AddToCartWrapper;
