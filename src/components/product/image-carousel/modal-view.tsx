'use client';

import ResponsiveImage from '@/components/shared/ui/responsive-image';
import type { ResponsiveImages } from '@/types/response';
import { FC, useEffect, useState } from 'react';

import { FiImage, FiRotateCcw, FiX, FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

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
    <div className="w-full h-full ">
      {/* Modal Header (matches store-locator-modal) */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 shrink-0 border-b border-gray-200 bg-white/90 sticky top-0 z-20">
        <h2 className="text-md sm:text-xl   truncate pr-4">{productName}</h2>

        <button
          type="button"
          aria-label="Close"
          className="p-1.5 bg-deep-maroon hover:bg-[#6b0000] rounded-full transition-colors shrink-0"
          onClick={onClose}
        >
          <FiX className="w-3 h-3 text-white" />
        </button>
      </div>

      {/* Desktop: horizontal layout, Mobile: vertical */}
      <div
        className={`p-3 grid lg:grid-cols-3 gap-4 max-h-[80vh] overflow-y-auto`}
      >
        {/* Main Image (left on desktop, top on mobile) */}
        <div className="lg:col-span-2 rounded-md overflow-hidden relative bg-gray-50 flex items-center justify-center max-h-[calc(80vh-26px)]">
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={4}
            centerOnInit
            key={selectedIndex}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className="absolute top-2 right-2 z-10 flex gap-2">
                  <button
                    onClick={() => zoomIn()}
                    className="p-2 bg-white/80 hover:bg-white rounded-full shadow-sm text-gray-700 hover:text-deep-maroon transition-colors"
                    title="Zoom In"
                  >
                    <FiZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => zoomOut()}
                    className="p-2 bg-white/80 hover:bg-white rounded-full shadow-sm text-gray-700 hover:text-deep-maroon transition-colors"
                    title="Zoom Out"
                  >
                    <FiZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => resetTransform()}
                    className="p-2 bg-white/80 hover:bg-white rounded-full shadow-sm text-gray-700 hover:text-deep-maroon transition-colors"
                    title="Reset"
                  >
                    <FiRotateCcw className="w-4 h-4" />
                  </button>
                </div>
                <TransformComponent
                  wrapperClass="!w-full !h-full"
                  contentClass="!w-full !h-full flex items-center justify-center"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <ResponsiveImage
                      key={selectedIndex}
                      images={images[selectedIndex]}
                      alt={`Product image ${selectedIndex + 1}`}
                      shouldFill={false}
                      objectFit="contain"
                      className="max-h-[80vh] w-auto h-auto"
                      layoutId={`product-image-${selectedIndex}`}
                      enableFadeTransition={true}
                    />
                  </div>
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>

        {/* Thumbnails: right on desktop, bottom on mobile */}
        {images.length > 1 ? (
          <div className="lg:grid lg:grid-cols-3 flex lg:overscroll-x-none overflow-x-auto lg:flex-wrap gap-2 bg-white/80">
            {images.map((img, idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`border-2 rounded-lg overflow-hidden transition-all duration-200 focus:outline-none h-fit lg:w-full w-20 shrink-0 ${
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
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 p-8 text-gray-500 bg-white/80">
            <FiImage className="h-8 w-8 mb-1 text-gray-400" />
            <span className="text-sm">No additional images</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCarouselModalView;
