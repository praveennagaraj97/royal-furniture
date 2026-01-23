'use client';

import { ViewOnce } from '@/components/shared/animations';

export interface ColorOption {
  id: string;
  name: string;
  value: string; // hex color or image URL
  isImage?: boolean;
  imageUrl?: string;
}

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
        amount={0.1}
        margin="0px"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm md:text-base font-semibold text-gray-900">
            Select Colour and Fabric
          </h3>
        </div>
      </ViewOnce>
      <div className="flex gap-3 flex-wrap">
        {colors.slice(0, 4).map((color) => {
          const imageUrl = color.imageUrl || color.value;
          const shouldUseImage = color.isImage || color.imageUrl;
          const fallbackColor =
            color.value && color.value.startsWith('#')
              ? color.value
              : '#cccccc';

          return (
            <button
              key={color.id}
              type="button"
              onClick={() => onColorChange(color.id)}
              className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border transition-all duration-200 flex items-center justify-center overflow-hidden ${
                selectedColor === color.id
                  ? 'border-deep-maroon ring ring-deep-maroon/20 scale-110'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              aria-label={color.name}
            >
              {shouldUseImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={color.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full rounded-full"
                  style={{ backgroundColor: fallbackColor }}
                  title={color.name}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
