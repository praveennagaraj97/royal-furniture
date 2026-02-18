export const pad = (n: number) => String(n).padStart(2, '0');

export const buildIso = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const formatDisplay = (iso?: string) => {
  if (!iso) return '';
  try {
    const d = new Date(iso + 'T00:00:00');
    // Format as DD/MM/YYYY
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
};

export const formatDateWithOrdinal = (iso?: string) => {
  if (!iso) return '';
  try {
    const d = new Date(iso + 'T00:00:00');
    const day = d.getDate();
    const month = d.toLocaleString('en-GB', { month: 'short' });
    const year = d.getFullYear();
    // Get ordinal suffix
    const j = day % 10,
      k = day % 100;
    let suffix = 'th';
    if (j === 1 && k !== 11) suffix = 'st';
    else if (j === 2 && k !== 12) suffix = 'nd';
    else if (j === 3 && k !== 13) suffix = 'rd';
    return `${day}${suffix} ${month} ${year}`;
  } catch {
    return iso;
  }
};

export const todayIso = () => new Date().toISOString().slice(0, 10);

export const monthNames = (d: Date) =>
  d.toLocaleString(undefined, { month: 'long', year: 'numeric' });

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
