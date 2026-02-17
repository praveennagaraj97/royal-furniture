export const pad = (n: number) => String(n).padStart(2, '0');

export const buildIso = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const formatDisplay = (iso?: string) => {
  if (!iso) return '';
  try {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString();
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
