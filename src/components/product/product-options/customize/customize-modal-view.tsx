import ResponsiveImage from '@/components/shared/ui/responsive-image';
import type { ResponsiveImages } from '@/types/response';
import { FC, useState } from 'react';
import { FiX } from 'react-icons/fi';

interface CustomizeModalViewProps {
  image?: ResponsiveImages;
  onClose?: () => void;
  productName: string;
}

const SEAT_COMFORT_METRICS = [
  { label: 'Seat Comfort', value: 4, total: 5 },
  { label: 'Seat Depth', value: 3, total: 5 },
  { label: 'Seat Height', value: 2, total: 5 },
  { label: 'Seat Softness', value: 4, total: 5 },
];

const CustomizeModalView: FC<CustomizeModalViewProps> = ({
  image,
  onClose,
  productName,
}) => {
  const [selectedSize, setSelectedSize] = useState('2 Seater');

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Modal Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 shrink-0 border-b border-gray-200 bg-white sticky top-0 z-20">
        <h2 className="text-md sm:text-xl text-gray-900 truncate font-semibold">
          Select Your Size | Select Colours and Fabrics
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

      <div className="flex-1 overflow-hidden">
        <div className="lg:grid lg:grid-cols-[1.5fr_2fr] h-full flex flex-col">
          {/* Left Column: Product Image (Desktop Only) */}
          <div className="hidden lg:flex p-4 items-center justify-center border-r border-gray-100 bg-gray-50 h-full">
            {image && (
              <div className="w-full h-full">
                <ResponsiveImage
                  images={image}
                  alt={productName}
                  shouldFill={false}
                  objectFit="contain"
                  className="w-full h-full"
                />
              </div>
            )}
          </div>
          {/* Right Column: Configurator Form (Mobile & Desktop) */}

          <div className="flex flex-col h-full w-full bg-white relative overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
              {/* Image for Mobile (Scrolls with content) */}
              <div className="lg:hidden mb-6 w-full aspect-4/3 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                {image && (
                  <ResponsiveImage
                    images={image}
                    alt={productName}
                    shouldFill={false}
                    objectFit="contain"
                    className="w-full h-full"
                  />
                )}
              </div>

              <div className="space-y-6">
                {/* Select Size */}
                <section>
                  <h3 className="text-gray-800 text-lg mb-2 font-light">
                    Select Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['1 Seater', '2 Seater', '3 Seater'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium ${
                          selectedSize === size
                            ? 'border-deep-maroon text-deep-maroon bg-rose-50/50 ring-1 ring-deep-maroon/20'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Seat Comfort */}
                <section>
                  <h3 className="text-gray-800 text-lg mb-4 font-light">
                    Seat Comfort
                  </h3>
                  <div className="space-y-3 max-w-md">
                    {SEAT_COMFORT_METRICS.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-900 font-medium w-32 text-sm">
                          {metric.label}
                        </span>
                        <div className="flex gap-1">
                          {Array.from({ length: metric.total }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-2.5 w-6 rounded-sm ${
                                i < metric.value ? 'bg-[#8B0000]' : 'bg-rose-50'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Dimensions */}
                <section>
                  <h3 className="text-gray-800 text-lg mb-2 font-light">
                    Dimensions
                  </h3>
                  <div className="flex flex-wrap gap-x-8 gap-y-2 text-gray-900 text-sm">
                    <div className="flex gap-2">
                      <span className="text-gray-600">Length :</span>
                      <span className="font-semibold">100 inch</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Height :</span>
                      <span className="font-semibold">20inch</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Angle :</span>
                      <span className="font-semibold">78 degree</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer Actions - Fixed at bottom of this column */}
            <div className="p-3 border-t border-gray-100 bg-white shrink-0 z-10 w-full">
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
      </div>
    </div>
  );
};

export default CustomizeModalView;
