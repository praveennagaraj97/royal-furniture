'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { authService } from '@/services/api/auth-service';
import {
  clearAuthTokens,
  getAuthToken,
  getRefreshToken,
  setAuthToken,
  setRefreshToken,
} from '@/utils';
import {
  getTimeUntilExpiry,
  getTokenExpiry,
  isTokenExpired,
} from '@/utils/jwt';
import {
  type FC,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshToken: () => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);
  const refreshTokenRef = useRef<(() => Promise<void>) | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const clearRefreshTimer = useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  }, []);

  const scheduleTokenRefresh = useCallback(() => {
    clearRefreshTimer();

    const authToken = getAuthToken();
    if (!authToken) {
      return;
    }

    if (isTokenExpired(authToken)) {
      if (refreshTokenRef.current) {
        refreshTokenRef.current();
      }
      return;
    }

    const timeUntilExpiry = getTimeUntilExpiry(authToken);
    if (!timeUntilExpiry) {
      return;
    }

    const refreshTime = Math.max(0, timeUntilExpiry - 5000);

    refreshTimerRef.current = setTimeout(() => {
      if (refreshTokenRef.current) {
        refreshTokenRef.current();
      }
    }, refreshTime);
  }, [clearRefreshTimer]);

  const refreshToken = useCallback(async () => {
    try {
      const refreshTokenValue = getRefreshToken();
      if (!refreshTokenValue) {
        setIsAuthenticated(false);
        clearAuthTokens();
        return;
      }

      const response = await authService.refreshToken(refreshTokenValue);

      if (response.data.access && response.data.refresh) {
        // Derive refresh token expiry from JWT and set as persistent cookie
        const refreshExpiry = getTokenExpiry(response.data.refresh);
        setRefreshToken(
          response.data.refresh,
          {
            expires: refreshExpiry ? new Date(refreshExpiry) : undefined,
          },
          false
        );

        // Derive access token expiry from JWT and set as persistent cookie
        const accessExpiry = getTokenExpiry(response.data.access);
        setAuthToken(
          response.data.access,
          {
            expires: accessExpiry ? new Date(accessExpiry) : undefined,
          },
          false
        );

        setIsAuthenticated(true);
        scheduleTokenRefresh();
      } else {
        setIsAuthenticated(false);
        clearAuthTokens();
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      setIsAuthenticated(false);
      clearAuthTokens();
    }
  }, [scheduleTokenRefresh]);

  useEffect(() => {
    refreshTokenRef.current = refreshToken;
  }, [refreshToken]);

  const checkAuthStatus = useCallback(() => {
    startTransition(() => {
      const authToken = getAuthToken();
      const refreshTokenValue = getRefreshToken();

      if (authToken && !isTokenExpired(authToken)) {
        setIsAuthenticated(true);
        scheduleTokenRefresh();
      } else if (refreshTokenValue) {
        refreshToken();
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });
  }, [refreshToken, scheduleTokenRefresh, startTransition]);

  const logout = useCallback(() => {
    clearAuthTokens();
    setIsAuthenticated(false);
    clearRefreshTimer();
    router.push('/');
  }, [router, clearRefreshTimer]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    checkAuthStatus();
  }, [pathname, checkAuthStatus]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAuthStatus();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [checkAuthStatus]);

  useEffect(() => {
    return () => {
      clearRefreshTimer();
    };
  }, [clearRefreshTimer]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        refreshToken,
        logout,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
