export interface DecodedToken {
  exp: number;
  iat: number;
  user_id: number;
  token_type?: string;
  jti?: string;
  [key: string]: unknown;
}

export const decodeJWT = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      return null;
    }

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload) as DecodedToken;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const getTokenExpiry = (token: string): number | null => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return null;
  }
  return decoded.exp * 1000;
};

export const isTokenExpired = (token: string): boolean => {
  const expiry = getTokenExpiry(token);
  if (!expiry) {
    return true;
  }
  return Date.now() >= expiry;
};

export const getTimeUntilExpiry = (token: string): number | null => {
  const expiry = getTokenExpiry(token);
  if (!expiry) {
    return null;
  }
  return expiry - Date.now();
};
