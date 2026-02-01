'use client';

import { FC, useState } from 'react';

const SEAT_COMFORT_METRICS = [
  { label: 'Seat Comfort', value: 4, total: 5 },
  { label: 'Seat Depth', value: 3, total: 5 },
  { label: 'Seat Height', value: 2, total: 5 },
  { label: 'Seat Softness', value: 4, total: 5 },
];

const SizeForm: FC = () => {
  const [selectedSize, setSelectedSize] = useState('2 Seater');

  return (
    <div className="space-y-6">
      {/* Select Size */}
      <section>
        <h3 className="text-gray-800 text-lg mb-2 font-light">Select Size</h3>
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
        <h3 className="text-gray-800 text-lg mb-4 font-light">Seat Comfort</h3>
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
        <h3 className="text-gray-800 text-lg mb-2 font-light">Dimensions</h3>
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
  );
};

export default SizeForm;
