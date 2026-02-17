'use client';

import { useClickOutside } from '@/hooks/use-click-outside';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useRef, useState } from 'react';
import { FiCalendar, FiChevronDown } from 'react-icons/fi';
import Calendar from './calendar';

export interface DatePickerProps {
  value?: string; // ISO date string YYYY-MM-DD
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
}

const formatDisplay = (iso?: string) => {
  if (!iso) return '';
  try {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString();
  } catch {
    return iso;
  }
};

const DatePicker: FC<DatePickerProps> = ({
  value,
  onChange,
  className = '',
  placeholder = 'Select date',
  minDate,
  maxDate,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside({ ref, handler: () => setOpen(false), enabled: open });

  const handleSelect = (date: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const iso = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate(),
    )}`;
    onChange?.(iso);
    setOpen(false);
  };

  // Ensure min is at least today when not provided
  const todayIso = new Date().toISOString().slice(0, 10);
  const effectiveMin = minDate ?? todayIso;
  const effectiveMax = maxDate ?? undefined;

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
        <FiChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden"
          >
            <Calendar
              selected={value ? new Date(value + 'T00:00:00') : undefined}
              onSelect={handleSelect}
              minDate={
                effectiveMin ? new Date(effectiveMin + 'T00:00:00') : undefined
              }
              maxDate={
                effectiveMax ? new Date(effectiveMax + 'T00:00:00') : undefined
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker;
