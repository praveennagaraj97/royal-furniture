'use client';

import { motion } from 'framer-motion';
import {
  FC,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { SizeOption } from '../../types';

interface Metric {
  label: string;
  value: number;
  total: number;
}

interface Dimension {
  label: string;
  value: string;
}

interface SizeGuideDetails {
  metrics: Metric[];
  dimensions: Dimension[];
}

interface SizeFormProps {
  sizeOptions?: SizeOption[];
  selectedSizeId?: string;
}

const DUMMY_SIZE_DETAILS: Record<string, SizeGuideDetails> = {
  '1-seater': {
    metrics: [
      { label: 'Seat Comfort', value: 3, total: 5 },
      { label: 'Seat Depth', value: 3, total: 5 },
      { label: 'Seat Height', value: 2, total: 5 },
      { label: 'Seat Softness', value: 4, total: 5 },
    ],
    dimensions: [
      { label: 'Length', value: '70 in' },
      { label: 'Height', value: '32 in' },
      { label: 'Depth', value: '34 in' },
      { label: 'Recline Angle', value: '82°' },
    ],
  },
  '2-seater': {
    metrics: [
      { label: 'Seat Comfort', value: 4, total: 5 },
      { label: 'Seat Depth', value: 4, total: 5 },
      { label: 'Seat Height', value: 3, total: 5 },
      { label: 'Seat Softness', value: 4, total: 5 },
    ],
    dimensions: [
      { label: 'Length', value: '88 in' },
      { label: 'Height', value: '34 in' },
      { label: 'Depth', value: '36 in' },
      { label: 'Recline Angle', value: '80°' },
    ],
  },
  '3-seater': {
    metrics: [
      { label: 'Seat Comfort', value: 4, total: 5 },
      { label: 'Seat Depth', value: 5, total: 5 },
      { label: 'Seat Height', value: 4, total: 5 },
      { label: 'Seat Softness', value: 3, total: 5 },
    ],
    dimensions: [
      { label: 'Length', value: '102 in' },
      { label: 'Height', value: '35 in' },
      { label: 'Depth', value: '38 in' },
      { label: 'Recline Angle', value: '78°' },
    ],
  },
};

const FALLBACK_DETAILS = DUMMY_SIZE_DETAILS['2-seater'];

const normalizeKey = (label: string) =>
  label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-');

const SizeForm: FC<SizeFormProps> = ({ sizeOptions, selectedSizeId }) => {
  const options = useMemo(() => sizeOptions ?? [], [sizeOptions]);

  const [activeSizeId, setActiveSizeId] = useState<string | undefined>(
    selectedSizeId || options[0]?.id,
  );
  const previousSelectedId = useRef<string | undefined>(selectedSizeId);

  useEffect(() => {
    if (
      selectedSizeId &&
      selectedSizeId !== previousSelectedId.current &&
      selectedSizeId !== activeSizeId
    ) {
      startTransition(() => {
        setActiveSizeId(selectedSizeId);
      });
    }
    previousSelectedId.current = selectedSizeId;
  }, [selectedSizeId, activeSizeId]);

  useEffect(() => {
    startTransition(() => {
      if (!activeSizeId && options[0]) {
        setActiveSizeId(options[0].id);
      }
      if (
        activeSizeId &&
        !options.find((option) => option.id === activeSizeId)
      ) {
        setActiveSizeId(options[0]?.id);
      }
    });
  }, [options, activeSizeId]);

  const handleSelection = (sizeId: string) => {
    setActiveSizeId(sizeId);
  };

  const activeOption = options.find((option) => option.id === activeSizeId);
  const activeKey = normalizeKey(activeOption?.label ?? '');
  const details = DUMMY_SIZE_DETAILS[activeKey] ?? FALLBACK_DETAILS;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Select Size */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-800 text-lg font-light">Select Size</h3>
          {/* <span className="text-xs text-gray-500">
            Live preview (sample data)
          </span> */}
        </div>
        <div className="flex flex-wrap gap-2">
          {options.length === 0 ? (
            <div className="text-sm text-gray-600">
              No size options available.
            </div>
          ) : (
            options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelection(option.id)}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium ${
                  activeSizeId === option.id
                    ? 'border-deep-maroon text-deep-maroon bg-rose-50/50 ring-1 ring-deep-maroon/20'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      </motion.section>

      {/* Seat Comfort */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut', delay: 0.05 }}
      >
        <h3 className="text-gray-800 text-lg mb-4 font-light">Seat Comfort</h3>
        <div className="space-y-3 max-w-md">
          {activeOption ? (
            details.metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex items-center justify-between"
              >
                <span className="font-medium w-32 text-sm">{metric.label}</span>
                <div className="flex gap-1">
                  {Array.from({ length: metric.total }).map((_, index) => (
                    <div
                      key={`${metric.label}-${index}`}
                      className={`h-2.5 w-6 rounded-sm ${
                        index < metric.value ? 'bg-[#8B0000]' : 'bg-rose-50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-600">
              Select a size to view comfort metrics.
            </div>
          )}
        </div>
      </motion.section>

      {/* Dimensions */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut', delay: 0.1 }}
      >
        <h3 className="text-gray-800 text-lg mb-2 font-light">Dimensions</h3>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
          {activeOption ? (
            details.dimensions.map((dimension) => (
              <div className="flex gap-2" key={dimension.label}>
                <span className="text-gray-600">{dimension.label}:</span>
                <span className="font-semibold">{dimension.value}</span>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-600">
              Select a size to view dimensions.
            </div>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default SizeForm;
