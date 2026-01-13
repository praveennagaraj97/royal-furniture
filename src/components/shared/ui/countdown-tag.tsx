'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { FiClock } from 'react-icons/fi';

export interface CountdownTagProps {
  dateString: string;
  className?: string;
}

const CountdownTag: FC<CountdownTagProps> = ({
  dateString,
  className = '',
}) => {
  const calculateTimeRemaining = useMemo(() => {
    if (!dateString || typeof dateString !== 'string') {
      return {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMs: 0,
      };
    }

    const trimmedDateString = dateString.trim();
    const targetDate = new Date(trimmedDateString).getTime();
    const now = new Date().getTime();

    if (isNaN(targetDate) || isNaN(now)) {
      return {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMs: 0,
      };
    }

    const diff = Math.max(0, targetDate - now);

    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const years = Math.floor(totalDays / 365);
    const daysAfterYears = totalDays % 365;
    const months = Math.floor(daysAfterYears / 30);
    const days = daysAfterYears % 30;
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    return { years, months, days, hours, minutes, seconds, totalMs: diff };
  }, [dateString]);

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  // Reset countdown when date string changes
  useEffect(() => {
    setTimeRemaining(calculateTimeRemaining);
  }, [calculateTimeRemaining]);

  useEffect(() => {
    if (!dateString || typeof dateString !== 'string') {
      return;
    }

    const interval = setInterval(() => {
      const trimmedDateString = dateString.trim();
      const targetDate = new Date(trimmedDateString).getTime();
      const now = new Date().getTime();

      if (isNaN(targetDate) || isNaN(now)) {
        return;
      }

      const diff = Math.max(0, targetDate - now);

      const totalSeconds = Math.floor(diff / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      const years = Math.floor(totalDays / 365);
      const daysAfterYears = totalDays % 365;
      const months = Math.floor(daysAfterYears / 30);
      const days = daysAfterYears % 30;
      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      setTimeRemaining({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        totalMs: diff,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dateString]);

  const formatCountdown = () => {
    const { years, months, days, hours, minutes, seconds, totalMs } =
      timeRemaining;

    // If totalMs is 0 or invalid, the countdown has expired or is invalid
    if (!totalMs || isNaN(totalMs)) {
      return '0m 0s';
    }

    // Ensure all values are valid numbers
    const safeYears = Number.isFinite(years) ? years : 0;
    const safeMonths = Number.isFinite(months) ? months : 0;
    const safeDays = Number.isFinite(days) ? days : 0;
    const safeHours = Number.isFinite(hours) ? hours : 0;
    const safeMinutes = Number.isFinite(minutes) ? minutes : 0;
    const safeSeconds = Number.isFinite(seconds) ? seconds : 0;

    if (safeYears > 0) {
      return `${safeYears}y ${safeMonths}m ${safeDays}d`;
    }

    if (safeMonths > 0) {
      return `${safeMonths}m ${safeDays}d ${safeHours}h`;
    }

    if (safeDays > 0) {
      return `${safeDays}d ${safeHours}h ${safeMinutes}m`;
    }

    if (safeHours > 0) {
      return `${safeHours}hrs ${safeMinutes}m ${safeSeconds}s`;
    }

    return `${safeMinutes}m ${safeSeconds}s`;
  };

  // Don't render if dateString is invalid
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }

  const trimmedDateString = dateString.trim();
  const targetDate = new Date(trimmedDateString).getTime();
  if (isNaN(targetDate)) {
    return null;
  }

  return (
    <div
      className={`inline-flex items-center gap-1 bg-deep-maroon/10 px-2 rounded-md ${className}`}
    >
      <FiClock className="w-3 h-3 text-deep-maroon" />
      <span className="text-xs font-medium text-indigo-slate">
        Ends in {formatCountdown()}
      </span>
    </div>
  );
};

export default CountdownTag;
