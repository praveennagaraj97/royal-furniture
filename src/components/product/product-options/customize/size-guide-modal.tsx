'use client';

import Modal from '@/components/shared/modal';
import { FC } from 'react';
import { FiX } from 'react-icons/fi';
import type { SizeOption } from '../../types';
import SizeForm from './size-form';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  sizeOptions?: SizeOption[];
  selectedSizeId?: string;
}

export const SizeGuideModal: FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  sizeOptions,
  selectedSizeId,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="center"
      size="lg"
      className="p-0 bg-transparent shadow-none"
    >
      <div className="w-full h-full flex flex-col bg-white rounded-md overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-medium text-gray-900">
            Size & Comfort Guide
          </h2>
          <button
            type="button"
            aria-label="Close"
            className="p-1.5 rounded-full bg-deep-maroon text-white hover:bg-[#6b0000] transition-colors"
            onClick={onClose}
          >
            <FiX className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto p-5">
          <SizeForm sizeOptions={sizeOptions} selectedSizeId={selectedSizeId} />
        </div>
      </div>
    </Modal>
  );
};
