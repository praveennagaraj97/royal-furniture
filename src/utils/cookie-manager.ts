import { COOKIE_NAMES, type CookieName } from '@/constants/cookies';

export interface CookieOptions {
  expires?: Date;
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const setCookie = (
  name: CookieName | string,
  value: string,
  options: CookieOptions = {}
): void => {
  if (typeof document === 'undefined') {
    console.warn('setCookie() can only be used in browser environment');
    return;
  }

  const {
    expires,
    maxAge,
    path = '/',
    domain,
    secure = true,
    sameSite = 'strict',
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (expires) {
    cookieString += `; expires=${expires.toUTCString()}`;
  }

  if (maxAge) {
    cookieString += `; max-age=${maxAge}`;
  }

  cookieString += `; path=${path}`;

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  if (secure) {
    cookieString += '; secure';
  }

  cookieString += `; samesite=${sameSite}`;

  document.cookie = cookieString;
};

export const getCookie = (name: CookieName | string): string | null => {
  if (typeof document === 'undefined') {
    console.warn('getCookie() can only be used in browser environment');
    return null;
  }

  const nameEQ = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
};

export const removeCookie = (
  name: CookieName | string,
  options: { path?: string; domain?: string } = {}
): void => {
  if (typeof document === 'undefined') {
    console.warn('removeCookie() can only be used in browser environment');
    return;
  }

  const { path = '/', domain } = options;

  document.cookie = `${encodeURIComponent(
    name
  )}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}${
    domain ? `; domain=${domain}` : ''
  }`;
};

export const hasCookie = (name: CookieName | string): boolean => {
  return getCookie(name) !== null;
};

export const getAllCookies = (): Record<string, string> => {
  if (typeof document === 'undefined') {
    return {};
  }

  const cookies: Record<string, string> = {};
  const cookieStrings = document.cookie.split(';');

  for (let i = 0; i < cookieStrings.length; i++) {
    const cookie = cookieStrings[i].trim();
    const [name, value] = cookie.split('=');
    if (name && value) {
      cookies[decodeURIComponent(name)] = decodeURIComponent(value);
    }
  }

  return cookies;
};

export const setAuthToken = (
  token: string,
  options?: CookieOptions,
  isSession = true
): void => {
  const cookieOptions: CookieOptions = {
    secure: true,
    sameSite: 'strict',
    path: '/',
  };

  if (!isSession && options) {
    if (options.expires) cookieOptions.expires = options.expires;
    if (options.maxAge) cookieOptions.maxAge = options.maxAge;
  }

  setCookie(COOKIE_NAMES.AUTH_TOKEN, token, cookieOptions);
};

export const getAuthToken = (): string | null => {
  return getCookie(COOKIE_NAMES.AUTH_TOKEN);
};

export const setRefreshToken = (
  token: string,
  options?: CookieOptions,
  isSession = true
): void => {
  const cookieOptions: CookieOptions = {
    secure: true,
    sameSite: 'strict',
    path: '/',
  };

  if (!isSession && options) {
    if (options.expires) cookieOptions.expires = options.expires;
    if (options.maxAge) cookieOptions.maxAge = options.maxAge;
  }

  setCookie(COOKIE_NAMES.REFRESH_TOKEN, token, cookieOptions);
};

export const getRefreshToken = (): string | null => {
  return getCookie(COOKIE_NAMES.REFRESH_TOKEN);
};

export const removeAuthToken = (): void => {
  removeCookie(COOKIE_NAMES.AUTH_TOKEN);
};

export const removeRefreshToken = (): void => {
  removeCookie(COOKIE_NAMES.REFRESH_TOKEN);
};

export const clearAuthTokens = (): void => {
  removeAuthToken();
  removeRefreshToken();
};

export const hasAuthToken = (): boolean => {
  return hasCookie(COOKIE_NAMES.AUTH_TOKEN);
};
