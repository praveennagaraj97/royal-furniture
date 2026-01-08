'use client';

import { ViewOnce } from '@/components/shared/animations';
import type { ProductFabric } from '@/types/response';
import Image from 'next/image';

export interface FabricSelectionProps {
  fabrics: ProductFabric[];
  selectedFabric: string;
  onFabricChange: (fabricName: string) => void;
}

export const FabricSelection: React.FC<FabricSelectionProps> = ({
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
      amount={0.01}
      margin="-100px"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">
            Select Fabric
          </h3>
        </div>
        <div className="flex gap-3 flex-wrap">
          {fabrics.map((fabric, index) => (
            <ViewOnce
              key={fabric.name}
              type="scale"
              initialScale={0.8}
              duration={0.3}
              delay={index * 0.05}
              amount={0.01}
              margin="-100px"
            >
              <button
                type="button"
                onClick={() => onFabricChange(fabric.name)}
                className={`relative w-16 h-16 rounded-lg border-2 transition-all duration-200 overflow-hidden ${
                  selectedFabric === fabric.name
                    ? 'border-deep-maroon ring ring-deep-maroon/20 scale-110'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                aria-label={fabric.name}
              >
                <Image
                  src={fabric.image}
                  alt={fabric.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            </ViewOnce>
          ))}
        </div>
      </div>
    </ViewOnce>
  );
};
