'use client';

import { FC, useMemo, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface CalendarProps {
  selected?: Date;
  onSelect: (d: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

const monthNames = (d: Date) =>
  d.toLocaleString(undefined, { month: 'long', year: 'numeric' });

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const addMonths = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth() + n, 1);

const getMonthMatrix = (d: Date) => {
  const start = startOfMonth(d);
  const startDay = start.getDay(); // 0..6 (Sun..Sat)
  const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

  const matrix: (Date | null)[] = [];
  // previous month's tail
  for (let i = 0; i < startDay; i++) matrix.push(null);
  for (let day = 1; day <= daysInMonth; day++)
    matrix.push(new Date(d.getFullYear(), d.getMonth(), day));

  // pad to complete weeks
  while (matrix.length % 7 !== 0) matrix.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < matrix.length; i += 7) {
    weeks.push(matrix.slice(i, i + 7));
  }

  return weeks;
};

const isSameDay = (a?: Date | null, b?: Date | null) => {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

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
