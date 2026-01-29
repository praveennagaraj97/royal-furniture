'use client';

import { ViewOnce } from '@/components/shared/animations';
import type { SizeOption } from '../types';

export interface SizeSelectionProps {
  sizes: SizeOption[];
  selectedSize: string;
  onSizeChange: (sizeId: string) => void;
}

export const SizeSelection: React.FC<SizeSelectionProps> = ({
  sizes,
  selectedSize,
  onSizeChange,
}) => {
  const selectedSizeObj = sizes.find((s) => s.id === selectedSize);

  return (
    <ViewOnce
      type="slideUp"
      distance={15}
      duration={0.4}
      delay={0.1}
      amount={0.01}
      margin="-40px"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm md:text-base font-semibold text-gray-900">
            Select Size and Dimensions
          </h3>
          {selectedSizeObj?.dimensions && (
            <button
              type="button"
              className="text-deep-maroon hover:underline text-xs md:text-sm font-medium"
            >
              View dimensions
            </button>
          )}
        </div>
        <div className="flex gap-3 flex-wrap">
          {sizes.map((size) => (
            <button
              key={size.id}
              type="button"
              onClick={() => onSizeChange(size.id)}
              className={`px-6 py-2.5 rounded-lg font-medium text-xs md:text-sm border transition-all duration-200 ${
                selectedSize === size.id
                  ? 'border-deep-maroon text-deep-maroon bg-deep-maroon/10'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>
    </ViewOnce>
  );
};
