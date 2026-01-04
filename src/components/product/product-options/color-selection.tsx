'use client';

import { ViewOnce } from '@/components/shared/animations';
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
    <div className="space-y-3">
      <ViewOnce
        type="slideUp"
        distance={15}
        duration={0.4}
        delay={0.1}
        amount={0.01}
        margin="-100px"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">
            Select Colour and Fabric
          </h3>
        </div>
      </ViewOnce>
      <div className="flex gap-3 flex-wrap">
        {colors.slice(0, 4).map((color, index) => (
          <ViewOnce
            key={color.id}
            type="scale"
            initialScale={0.8}
            duration={0.3}
            delay={index * 0.05}
            amount={0.01}
            margin="-100px"
          >
            <button
              type="button"
              onClick={() => onColorChange(color.id)}
              className={`relative w-10 h-10 rounded-full border transition-all duration-200 ${
                selectedColor === color.id
                  ? 'border-deep-maroon ring ring-deep-maroon/20 scale-110'
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
          </ViewOnce>
        ))}
        <ViewOnce
          type="fade"
          duration={0.3}
          delay={0.2}
          amount={0.01}
          margin="-100px"
        >
          <button
            type="button"
            className="text-deep-maroon hover:underline text-sm font-medium ml-3"
          >
            See All
          </button>
        </ViewOnce>
      </div>
    </div>
  );
};
