import ResponsiveImage from '@/components/shared/ui/responsive-image';
import type { ResponsiveImages } from '@/types/response';
import { FC, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

interface ImageCarouselModalViewProps {
  images: ResponsiveImages[];
  initialIndex: number;
  onClose?: () => void;
  productName: string;
}

const ImageCarouselModalView: FC<ImageCarouselModalViewProps> = ({
  images,
  initialIndex,
  onClose,
  productName,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  // Keep selectedIndex in sync with initialIndex when modal opens
  useEffect(() => {
    setSelectedIndex(initialIndex);
  }, [initialIndex]);

  // Show 4 thumbnails in a row on desktop, all in a row on mobile
  return (
    <div className="w-full h-full">
      {/* Modal Header (matches store-locator-modal) */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 shrink-0 border-b border-gray-200 bg-white/90 sticky top-0 z-20">
        <h2 className="text-md sm:text-xl text-gray-900 truncate">
          {productName}
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

      {/* Desktop: horizontal layout, Mobile: vertical */}
      <div className={`p-3 ${images.length > 1 ? 'grid lg:grid-cols-3' : ''}`}>
        {/* Main Image (left on desktop, top on mobile) */}
        <div className="lg:col-span-2 rounded-md overflow-hidden">
          <ResponsiveImage
            key={selectedIndex}
            images={images[selectedIndex]}
            alt={`Product image ${selectedIndex + 1}`}
            shouldFill={false}
            objectFit="contain"
            layoutId={`product-image-${selectedIndex}`}
            enableFadeTransition={true}
          />
        </div>

        {/* Thumbnails: right on desktop, bottom on mobile */}
        {images.length > 1 && (
          <div className="flex overflow-x-auto flex-wrap gap-2 p-4 bg-white/80">
            {images.map((img, idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`border-2 rounded-lg overflow-hidden transition-all duration-200 focus:outline-none h-fit max-w-20 ${
                    selectedIndex === idx
                      ? 'border-deep-maroon ring-2 ring-deep-maroon/20'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${selectedIndex === idx ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                >
                  <ResponsiveImage
                    images={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="object-cover aspect-square"
                    shouldFill={false}
                    objectFit="cover"
                    enableFadeTransition={false}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCarouselModalView;
