'use client';

import Swiper from '@/components/shared/swiper';
import ProductCustomizeSkeleton from '@/components/skeletons/product-customize-skeleton';
import { useGetFabricConfig } from '@/hooks/api';
import { motion } from 'framer-motion';
import { FC, useMemo, useState } from 'react';

interface FabricCustomizeFormProps {
  productSlug: string;
}

const FabricCustomizeForm: FC<FabricCustomizeFormProps> = ({ productSlug }) => {
  const { fabrics, isLoading, error } = useGetFabricConfig({ productSlug });

  const [selectedFabricIndex, setSelectedFabricIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const selectedFabric = useMemo(() => {
    if (!fabrics.length) return null;
    return fabrics[Math.min(selectedFabricIndex, fabrics.length - 1)];
  }, [fabrics, selectedFabricIndex]);

  const selectedColor = useMemo(() => {
    if (!selectedFabric || !selectedFabric.colors.length) return null;
    return selectedFabric.colors[
      Math.min(selectedColorIndex, selectedFabric.colors.length - 1)
    ];
  }, [selectedFabric, selectedColorIndex]);

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
      {/* Fabric selection */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut', delay: 0.05 }}
      >
        <h3 className="text-gray-800 text-lg mb-2 font-light">Select Fabric</h3>
        <Swiper gap={1} hideArrowOnMobile alwaysAlignStart className="pt-1">
          {fabrics.map((fabric, index) => {
            const isActive = index === selectedFabricIndex;
            return (
              <button
                key={fabric.name}
                type="button"
                onClick={() => {
                  setSelectedFabricIndex(index);
                  setSelectedColorIndex(0);
                }}
                className={`m-1 shrink-0 flex flex-col items-start p-2 rounded-lg border bg-white shadow-sm transition-all duration-150 w-32 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-deep-maroon/40 ${
                  isActive
                    ? 'border-deep-maroon ring-1 ring-deep-maroon/30'
                    : 'border-gray-200'
                }`}
              >
                <div className="w-full h-16 rounded-md overflow-hidden bg-gray-50 mb-1">
                  {fabric.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={fabric.image}
                      alt={fabric.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                </div>
                <span className="text-xs font-medium text-gray-800 truncate">
                  {fabric.name}
                </span>
              </button>
            );
          })}
        </Swiper>
      </motion.section>

      {/* Color selection */}
      {selectedFabric && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut', delay: 0.1 }}
        >
          <h3 className="text-gray-800 text-lg mb-2 font-light">
            Select Color
          </h3>
          <Swiper
            key={selectedFabric?.name ?? 'default'}
            gap={1}
            hideArrowOnMobile
            alwaysAlignStart
          >
            {selectedFabric.colors.map((color, index) => {
              const isActive = index === selectedColorIndex;
              return (
                <button
                  key={`${color.variant_id}-${color.name}`}
                  type="button"
                  onClick={() => setSelectedColorIndex(index)}
                  className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all duration-150 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-deep-maroon/40 ${
                    isActive
                      ? 'border-deep-maroon bg-rose-50/70 text-deep-maroon'
                      : 'border-gray-200 text-gray-800 bg-white'
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full border border-gray-200 shadow-sm"
                    style={{ backgroundColor: color.hex_code || '#E5E7EB' }}
                  />
                  <span className="font-medium truncate max-w-25">
                    {color.name}
                  </span>
                </button>
              );
            })}
          </Swiper>
        </motion.section>
      )}

      {/* Summary */}
      {selectedFabric && selectedColor && (
        <motion.section
          className="mt-2 text-sm text-gray-700 space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut', delay: 0.15 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Selected Fabric</span>
            <span className="font-semibold">{selectedFabric.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Selected Color</span>
            <span className="font-semibold">{selectedColor.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Variant SKU</span>
            <span className="font-mono text-xs font-semibold">
              {selectedColor.variant_sku}
            </span>
          </div>
        </motion.section>
      )}
    </motion.div>
  );
};

export default FabricCustomizeForm;
