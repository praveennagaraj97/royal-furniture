import ResponsiveImage from '@/components/shared/ui/responsive-image';
import type { ResponsiveImages } from '@/types/response';
import { FC } from 'react';
import { FiX } from 'react-icons/fi';
import SizeForm from './size-form';

interface CustomizeModalViewProps {
  image?: ResponsiveImages;
  onClose?: () => void;
  productName: string;
}

const CustomizeModalView: FC<CustomizeModalViewProps> = ({
  image,
  onClose,
  productName,
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Modal Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 shrink-0 border-b border-gray-200 bg-white sticky top-0 z-20">
        <h2 className="text-md sm:text-xl text-gray-900 truncate font-medium">
          Select Your Size
        </h2>

        <button
          type="button"
          aria-label="Close"
          className="p-1.5 bg-deep-maroon hover:bg-[#6b0000] rounded-full transition-colors ml-4 shrink-0"
          onClick={onClose}
        >
          <FiX className="w-3 h-3 text-white" />
        </button>
      </div>
      <div className="relative">
        <div className="grid lg:grid-cols-2 max-h-[80vh] overflow-y-auto">
          {/* Image Section */}
          <div className="w-full">
            <ResponsiveImage
              images={image}
              enableFadeTransition
              objectFit="contain"
              className="aspect-square"
              alt={productName}
            />
          </div>

          <div className="p-4">
            {/* Options Section */}
            <div className="overflow-y-auto pb-20">
              <SizeForm />
            </div>
          </div>
        </div>
        {/* Footer Actions - Fixed at bottom of this column */}
        <div className="p-2 border-t border-gray-100 z-10 w-full absolute bottom-0 inset-x-0 bg-white">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-[#8B0000] hover:bg-[#6b0000] text-white px-8 py-2.5 rounded-lg font-medium transition-colors duration-200"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeModalView;
