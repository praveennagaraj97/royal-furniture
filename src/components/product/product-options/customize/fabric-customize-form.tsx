'use client';

import ProductCustomizeSkeleton from '@/components/skeletons/product-customize-skeleton';
import { useGetFabricConfig } from '@/hooks/api';
import { motion } from 'framer-motion';
import { FC, KeyboardEvent, useState } from 'react';

interface FabricCustomizeFormProps {
  productSlug: string;
}

const FabricCustomizeForm: FC<FabricCustomizeFormProps> = ({ productSlug }) => {
  const { fabrics, isLoading, error } = useGetFabricConfig({ productSlug });

  const [selectedFabricIndex, setSelectedFabricIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  if (isLoading) {
    return <ProductCustomizeSkeleton />;
  }

  if (error) {
    return (
      <div className="text-sm text-red-600">
        Unable to load customization options right now. Please try again later.
      </div>
    );
  }

  if (!fabrics.length) {
    return (
      <div className="text-sm text-gray-600">
        No customization options are available for this product.
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut', delay: 0.05 }}
      >
        <h3 className="text-gray-800 text-lg mb-4 font-light">
          Choose Fabric & Color
        </h3>
        <div className="space-y-3">
          {fabrics.map((fabric, fabricIndex) => {
            const isActive = fabricIndex === selectedFabricIndex;
            const colorPreviewIndex = isActive
              ? Math.min(selectedColorIndex, fabric.colors.length - 1)
              : 0;
            const previewColor = fabric.colors[colorPreviewIndex];

            const handleFabricSelect = () => {
              setSelectedFabricIndex(fabricIndex);
              setSelectedColorIndex(0);
            };

            const handleKeySelect = (event: KeyboardEvent<HTMLDivElement>) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleFabricSelect();
              }
            };

            return (
              <div
                key={fabric.name}
                role="button"
                tabIndex={0}
                onClick={handleFabricSelect}
                onKeyDown={handleKeySelect}
                className={`relative flex gap-3 p-3 sm:p-4 rounded-2xl border bg-white shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-maroon/40 ${
                  isActive
                    ? 'border-deep-maroon ring-1 ring-deep-maroon/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                  {fabric.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={fabric.image}
                      alt={fabric.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {fabric.name}
                      </p>
                      {previewColor && (
                        <p className="text-xs font-mono text-gray-500 mt-1">
                          {previewColor.hex_code || previewColor.name}
                        </p>
                      )}
                    </div>
                    <span
                      className={`mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full border-2 ${
                        isActive ? 'border-deep-maroon' : 'border-gray-300'
                      }`}
                      aria-hidden="true"
                    >
                      {isActive && (
                        <span className="w-2.5 h-2.5 rounded-full bg-deep-maroon" />
                      )}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {fabric.colors.length ? (
                      fabric.colors.map((color, colorIndex) => {
                        const isColorActive =
                          isActive && colorIndex === selectedColorIndex;
                        return (
                          <button
                            key={`${color.variant_id}-${color.name}`}
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedFabricIndex(fabricIndex);
                              setSelectedColorIndex(colorIndex);
                            }}
                            className={`w-7 h-7 rounded-full border-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-maroon/40 ${
                              isColorActive
                                ? 'border-deep-maroon shadow-[0_0_0_3px_rgba(139,0,0,0.15)]'
                                : 'border-gray-300'
                            }`}
                            style={{
                              backgroundColor: color.hex_code || '#E5E7EB',
                            }}
                          >
                            <span className="sr-only">
                              {`${color.name} in ${fabric.name}`}
                            </span>
                          </button>
                        );
                      })
                    ) : (
                      <span className="text-xs text-gray-500">
                        Colors unavailable
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default FabricCustomizeForm;
