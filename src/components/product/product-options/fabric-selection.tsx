'use client';

import { ViewOnce } from '@/components/shared/animations';
import type { ProductFabric } from '@/types/response';
import { FC } from 'react';

export interface FabricSelectionProps {
  fabrics: ProductFabric[];
  selectedFabric: string;
  onFabricChange: (fabricName: string) => void;
}

export const FabricSelection: FC<FabricSelectionProps> = ({
  fabrics,
  selectedFabric,
  onFabricChange,
}) => {
  return (
    <ViewOnce
      type="slideUp"
      distance={15}
      duration={0.4}
      delay={0.1}
      amount={0.1}
      margin="0px"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm md:text-base font-medium  ">Select Fabric</h3>
        </div>
        <div className="flex gap-3 flex-wrap">
          {fabrics.map((fabric) => (
            <button
              key={fabric.name}
              type="button"
              onClick={() => onFabricChange(fabric.name)}
              className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg border-2 transition-all duration-200 overflow-hidden p-px ${
                selectedFabric === fabric.name
                  ? 'border-deep-maroon ring ring-deep-maroon/20 scale-110'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              aria-label={fabric.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fabric.image}
                alt={fabric.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </button>
          ))}
        </div>
      </div>
    </ViewOnce>
  );
};
