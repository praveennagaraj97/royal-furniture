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
  const logoutRef = useRef<(() => void) | null>(null);
  const isInitialLoadRef = useRef(true);
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

  const refreshToken = useCallback(
    async (shouldLogoutOnFailure = false) => {
      try {
        const refreshTokenValue = getRefreshToken();
        if (!refreshTokenValue) {
          setIsAuthenticated(false);
          clearAuthTokens();
          if (shouldLogoutOnFailure && logoutRef.current) {
            logoutRef.current();
          }
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
          if (shouldLogoutOnFailure && logoutRef.current) {
            logoutRef.current();
          }
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
        setIsAuthenticated(false);
        clearAuthTokens();
        if (shouldLogoutOnFailure && logoutRef.current) {
          logoutRef.current();
        }
      }
    },
    [scheduleTokenRefresh]
  );

  const logout = useCallback(() => {
    clearAuthTokens();
    setIsAuthenticated(false);
    clearRefreshTimer();
    router.push('/');
  }, [router, clearRefreshTimer]);

  useEffect(() => {
    refreshTokenRef.current = refreshToken;
    logoutRef.current = logout;
  }, [refreshToken, logout]);

  const checkAuthStatus = useCallback(() => {
    startTransition(() => {
      const authToken = getAuthToken();
      const refreshTokenValue = getRefreshToken();
      const isInitialLoad = isInitialLoadRef.current;

      // On initial load (hard reload), always refresh if refresh token exists
      if (isInitialLoad && refreshTokenValue) {
        isInitialLoadRef.current = false;
        // Refresh token and logout on failure for initial load
        refreshToken(true).finally(() => {
          setIsLoading(false);
        });
        return;
      }

      // For subsequent checks
      if (authToken && !isTokenExpired(authToken)) {
        setIsAuthenticated(true);
        scheduleTokenRefresh();
        setIsLoading(false);
      } else if (refreshTokenValue) {
        // Background refresh - don't logout on failure, just clear tokens
        refreshToken(false).finally(() => {
          setIsLoading(false);
        });
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    });
  }, [refreshToken, scheduleTokenRefresh, startTransition]);

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

    const handleTokenInvalid = () => {
      logout();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('token-invalid', handleTokenInvalid);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('token-invalid', handleTokenInvalid);
    };
  }, [checkAuthStatus, logout]);

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
