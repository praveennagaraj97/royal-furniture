'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { FiClock } from 'react-icons/fi';

export interface CountdownTagProps {
  hours: number;
  minutes: number;
  seconds?: number;
  className?: string;
}

const CountdownTag: FC<CountdownTagProps> = ({
  hours,
  minutes,
  seconds = 0,
  className = '',
}) => {
  const initialTotalSeconds = useMemo(
    () => hours * 3600 + minutes * 60 + seconds,
    [hours, minutes, seconds]
  );
  const [totalSeconds, setTotalSeconds] = useState(initialTotalSeconds);

  // Reset countdown when initial values change
  useEffect(() => {
    setTotalSeconds(initialTotalSeconds);
  }, [initialTotalSeconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 0) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const displayHours = Math.floor(totalSeconds / 3600);
  const displayMinutes = Math.floor((totalSeconds % 3600) / 60);
  const displaySeconds = totalSeconds % 60;

  return (
    <div
      className={`inline-flex items-center gap-1 bg-deep-maroon/10 px-2 rounded-md ${className}`}
    >
      <FiClock className="w-3 h-3 text-deep-maroon" />
      <span className="text-xs font-medium text-indigo-slate">
        Ends in {displayHours}h {displayMinutes}m {displaySeconds}s
      </span>
    </div>
  );
};

export default CountdownTag;
