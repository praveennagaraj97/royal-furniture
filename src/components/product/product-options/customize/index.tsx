'use client';

import { ViewOnce } from '@/components/shared/animations';
import Modal from '@/components/shared/modal';
import { ResponsiveImages } from '@/types/response';
import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { MdOutlineSettingsSuggest } from 'react-icons/md';
import CustomizeModalView from './customize-modal-view';

interface CustomizeSectionProps {
  productName: string;
  currentImage?: ResponsiveImages;
}

export const CustomizeSection: React.FC<CustomizeSectionProps> = ({
  productName,
  currentImage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ViewOnce
        type="slideUp"
        distance={15}
        duration={0.4}
        delay={0.1}
        amount={0.01}
        margin="-40px"
      >
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-between p-2 bg-deep-maroon/10 hover:bg-deep-maroon/20 rounded-lg transition-colors duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div>
              <MdOutlineSettingsSuggest className="text-3xl text-deep-maroon" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-deep-maroon">
                Customize Yours
              </div>
              <div className="text-xs font-medium text-indigo-slate">
                Any Color, Any Size!
              </div>
            </div>
          </div>
          <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-deep-maroon transition-colors" />
        </button>
      </ViewOnce>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant="center"
        size="xl"
        className="p-0 bg-transparent shadow-none"
      >
        <CustomizeModalView
          productName={productName}
          image={currentImage}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};
