'use client';

import { useClickOutside } from '@/hooks/use-click-outside';
import {
  buildIso,
  formatDisplay,
  parseDateInput,
  todayIso,
} from '@/utils/date';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useRef, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import Calendar from './calendar';

export interface DatePickerProps {
  value?: string; // ISO date string YYYY-MM-DD
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  highlightedDates?: string[];
  highlightedLabel?: string;
}

const DatePicker: FC<DatePickerProps> = ({
  value,
  onChange,
  className = '',
  placeholder = 'Select date',
  minDate,
  maxDate,
  highlightedDates,
  highlightedLabel,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside({ ref, handler: () => setOpen(false), enabled: open });

  const handleSelect = (date: Date) => {
    const iso = buildIso(date);
    onChange?.(iso);
    setOpen(false);
  };

  // Ensure min is at least today when not provided
  const effectiveMin = minDate ?? todayIso();
  const effectiveMax = maxDate ?? undefined;

  const selectedDate = value ? parseDateInput(value) : null;
  const highlighted =
    highlightedDates
      ?.map((d) => parseDateInput(d))
      .filter((d): d is Date => Boolean(d)) ?? [];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none"
      >
        <FiCalendar className="w-4 h-4 text-gray-500" />
        <span className="flex-1 text-left">
          {value ? (
            formatDisplay(value)
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
          >
            <Calendar
              selected={selectedDate ?? undefined}
              onSelect={handleSelect}
              minDate={
                effectiveMin ? new Date(effectiveMin + 'T00:00:00') : undefined
              }
              maxDate={
                effectiveMax ? new Date(effectiveMax + 'T00:00:00') : undefined
              }
              highlightedDates={highlighted}
              highlightedLabel={highlightedLabel}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker;
