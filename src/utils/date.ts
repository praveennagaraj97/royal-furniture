export const pad = (n: number) => String(n).padStart(2, '0');

export const buildIso = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const monthMap: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

export const parseDateInput = (value?: string | null): Date | null => {
  if (!value) return null;
  const trimmed = value.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const isoDate = new Date(trimmed + 'T00:00:00');
    return Number.isNaN(isoDate.getTime()) ? null : isoDate;
  }

  const parsed = Date.parse(trimmed);
  if (!Number.isNaN(parsed)) {
    const date = new Date(parsed);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const ordinalMatch = trimmed.match(
    /^(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)\s+(\d{4})$/i,
  );
  if (ordinalMatch) {
    const day = Number(ordinalMatch[1]);
    const monthKey = ordinalMatch[2].slice(0, 3).toLowerCase();
    const year = Number(ordinalMatch[3]);
    const month = monthMap[monthKey];

    if (month !== undefined) {
      const date = new Date(year, month, day);
      return Number.isNaN(date.getTime()) ? null : date;
    }
  }

  return null;
};

export const formatDisplay = (iso?: string) => {
  if (!iso) return '';
  const date = parseDateInput(iso);
  if (!date) return iso;

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatDateWithOrdinal = (iso?: string, withTime = false) => {
  if (!iso) return '';

  const date = parseDateInput(iso);
  if (!date) return iso;

  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'long' });
  const year = date.getFullYear();
  const j = day % 10;
  const k = day % 100;
  let suffix = 'th';
  if (j === 1 && k !== 11) suffix = 'st';
  else if (j === 2 && k !== 12) suffix = 'nd';
  else if (j === 3 && k !== 13) suffix = 'rd';

  if (withTime) {
    const time = date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${day}${suffix} ${month} ${year}, ${time}`;
  }

  return `${day}${suffix} ${month} ${year}`;
};

export const todayIso = () => new Date().toISOString().slice(0, 10);

export const monthNames = (d: Date, locale?: string) =>
  d.toLocaleString(locale || undefined, { month: 'long', year: 'numeric' });

export const startOfMonth = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), 1);
export const addMonths = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth() + n, 1);

export const getMonthMatrix = (d: Date) => {
  const start = startOfMonth(d);
  const startDay = start.getDay(); // 0..6 (Sun..Sat)
  const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

  const matrix: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) matrix.push(null);
  for (let day = 1; day <= daysInMonth; day++)
    matrix.push(new Date(d.getFullYear(), d.getMonth(), day));

  while (matrix.length % 7 !== 0) matrix.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < matrix.length; i += 7) {
    weeks.push(matrix.slice(i, i + 7));
  }

  return weeks;
};

export const isSameDay = (a?: Date | null, b?: Date | null) => {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};
