'use client';

import { SlideIn } from '@/components/shared/animations';
import type { ColorOption } from '../types';

export interface ColorSelectionProps {
  colors: ColorOption[];
  selectedColor: string;
  onColorChange: (colorId: string) => void;
}

export const ColorSelection: React.FC<ColorSelectionProps> = ({
  colors,
  selectedColor,
  onColorChange,
}) => {
  return (
    <SlideIn direction="up" distance={15} duration={0.4} delay={0.4}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">
            Select Colour and Fabric
          </h3>
        </div>
        <div className="flex gap-3 flex-wrap">
          {colors.slice(0, 4).map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => onColorChange(color.id)}
              className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                selectedColor === color.id
                  ? 'border-deep-maroon ring-2 ring-deep-maroon/20 scale-110'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              aria-label={color.name}
            >
              {color.isImage ? (
                <div
                  className="w-full h-full rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${color.value})` }}
                />
              ) : (
                <div
                  className="w-full h-full rounded-full"
                  style={{ backgroundColor: color.value }}
                />
              )}
            </button>
          ))}
          <button
            type="button"
            className="text-deep-maroon hover:underline text-sm font-medium ml-3"
          >
            See All
          </button>
        </div>
      </div>
    </SlideIn>
  );
};

