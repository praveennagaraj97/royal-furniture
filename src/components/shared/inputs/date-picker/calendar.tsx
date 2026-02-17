'use client';

import {
  addMonths,
  getMonthMatrix,
  isSameDay,
  monthNames,
  startOfMonth,
} from '@/utils/date';
import { FC, useMemo, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface CalendarProps {
  selected?: Date;
  onSelect: (d: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

const Calendar: FC<CalendarProps> = ({
  selected,
  onSelect,
  minDate,
  maxDate,
}) => {
  const [month, setMonth] = useState<Date>(
    selected
      ? new Date(selected.getFullYear(), selected.getMonth(), 1)
      : startOfMonth(new Date()),
  );

  const weeks = useMemo(() => getMonthMatrix(month), [month]);

  const handlePrev = () => setMonth((m) => addMonths(m, -1));
  const handleNext = () => setMonth((m) => addMonths(m, 1));

  const today = new Date();

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={handlePrev}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <FiChevronLeft />
        </button>
        <div className="text-sm font-medium">{monthNames(month)}</div>
        <button
          type="button"
          onClick={handleNext}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <FiChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-7 text-xs text-gray-500 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((day, idx) => {
          const disabled = day
            ? (minDate ? day < minDate : false) ||
              (maxDate ? day > maxDate : false)
            : true;
          const isSelected = isSameDay(day, selected ?? null);
          const isToday = isSameDay(day, today);

          return (
            <button
              key={idx}
              type="button"
              onClick={() => day && !disabled && onSelect(day)}
              disabled={!day || disabled}
              className={`h-8 w-8 flex items-center justify-center rounded-md text-sm ${
                !day
                  ? 'text-gray-300'
                  : isSelected
                    ? 'bg-deep-maroon text-white'
                    : isToday
                      ? 'border border-deep-maroon text-deep-maroon'
                      : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {day ? day.getDate() : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
