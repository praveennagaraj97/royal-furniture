const STORAGE_KEY = 'rf-guest-session-v1';

const generateId = (): string => {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }
  return (
    'gs_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
  );
};

export const getGuestSession = (): string | null => {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(STORAGE_KEY);
};

export const createGuestSession = (): string => {
  if (typeof window === 'undefined') return '';
  const id = generateId();
  window.localStorage.setItem(STORAGE_KEY, id);
  return id;
};

export const getOrCreateGuestSession = (): string => {
  if (typeof window === 'undefined') return '';
  const existing = getGuestSession();
  return existing || createGuestSession();
};
