import ResponsiveImage from '@/components/shared/ui/responsive-image';
import type { ResponsiveImages } from '@/types/response';
import { FC } from 'react';
import { FiX } from 'react-icons/fi';
import FabricCustomizeForm from './fabric-customize-form';

interface CustomizeModalViewProps {
  image?: ResponsiveImages;
  onClose?: () => void;
  productName: string;
  productSlug: string;
}

const CustomizeModalView: FC<CustomizeModalViewProps> = ({
  image,
  onClose,
  productName,
  productSlug,
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-md overflow-hidden">
      {/* Modal Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 shrink-0 border-b border-gray-200 bg-white sticky top-0 z-20">
        <h2 className="text-md sm:text-xl   truncate font-medium">
          Customize Fabric & Color
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
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="w-full flex items-center justify-center bg-white">
            <ResponsiveImage
              images={image}
              enableFadeTransition
              objectFit="contain"
              className="max-h-[65vh] w-full"
              alt={productName}
            />
          </div>

          <div className="w-full p-4 px-5.5">
            {/* Options Section */}
            <FabricCustomizeForm productSlug={productSlug} />
          </div>
        </div>
      </div>
      {/* Footer Actions - fixed to bottom of modal */}
      <div className="shrink-0 p-2 border-t border-gray-100 bg-white">
        <div className="flex justify-end">
          <button
            onClick={() => {
              void onClose?.();
            }}
            type="button"
            className="w-full sm:w-auto bg-[#8B0000] hover:bg-[#6b0000] text-white px-8 py-2.5 rounded-lg font-medium transition-colors duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeModalView;
