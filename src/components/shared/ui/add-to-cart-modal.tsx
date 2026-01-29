'use client';

import { FC, Fragment, ReactNode, useState } from 'react';
import Modal from '../modal';

const AddToCartWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Fragment>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal variant="center" isOpen={isOpen} onClose={() => setOpen(false)}>
        <div>Added to cart Ui</div>
      </Modal>
    </Fragment>
  );
};

export default AddToCartWrapper;
