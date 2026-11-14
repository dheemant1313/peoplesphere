import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('peoplesphere_token'));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('peoplesphere_refresh_token'));
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('peoplesphere_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  // Restore and verify session from backend on initial mount
  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      const storedToken = localStorage.getItem('peoplesphere_token');
      if (!storedToken) {
        if (isMounted) setIsLoading(false);
        return;
      }

      try {
        const profile = await authService.getCurrentUser();
        if (isMounted) {
          setUser(profile);
          localStorage.setItem('peoplesphere_user', JSON.stringify(profile));
        }
      } catch (err) {
        console.warn('Session verification failed, attempting token cleanup:', err);
        // Note: api.js response interceptor handles refresh automatically
        // If it still fails, cleanup tokens
        if (isMounted) {
          setUser(null);
          setToken(null);
          setRefreshToken(null);
          localStorage.removeItem('peoplesphere_token');
          localStorage.removeItem('peoplesphere_refresh_token');
          localStorage.removeItem('peoplesphere_user');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    restoreSession();

    // Listen for session expired events dispatched by api interceptor
    const handleExpired = () => {
      setSessionExpired(true);
      setUser(null);
      setToken(null);
      setRefreshToken(null);
    };

    window.addEventListener('peoplesphere:session-expired', handleExpired);

    return () => {
      isMounted = false;
      window.removeEventListener('peoplesphere:session-expired', handleExpired);
    };
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    const { token: tokenPayload, user: userPayload } = data;

    localStorage.setItem('peoplesphere_token', tokenPayload.access_token);
    localStorage.setItem('peoplesphere_refresh_token', tokenPayload.refresh_token);
    localStorage.setItem('peoplesphere_user', JSON.stringify(userPayload));

    setToken(tokenPayload.access_token);
    setRefreshToken(tokenPayload.refresh_token);
    setUser(userPayload);
    setSessionExpired(false);

    // Fetch full permissions in background
    try {
      const fullProfile = await authService.getCurrentUser();
      setUser(fullProfile);
      localStorage.setItem('peoplesphere_user', JSON.stringify(fullProfile));
    } catch {
      // Fallback to basic profile from login response
    }

    return userPayload;
  };

  const setAuthSession = (authData) => {
    const { token: tokenPayload, user: userPayload } = authData;
    if (tokenPayload) {
      localStorage.setItem('peoplesphere_token', tokenPayload.access_token);
      localStorage.setItem('peoplesphere_refresh_token', tokenPayload.refresh_token);
      setToken(tokenPayload.access_token);
      setRefreshToken(tokenPayload.refresh_token);
    }
    if (userPayload) {
      localStorage.setItem('peoplesphere_user', JSON.stringify(userPayload));
      setUser(userPayload);
    }
    setSessionExpired(false);
  };

  const logout = useCallback(async () => {
    const currentRefresh = localStorage.getItem('peoplesphere_refresh_token');
    try {
      await authService.logout(currentRefresh);
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('peoplesphere_token');
      localStorage.removeItem('peoplesphere_refresh_token');
      localStorage.removeItem('peoplesphere_user');
      setToken(null);
      setRefreshToken(null);
      setUser(null);
      setSessionExpired(false);
    }
  }, []);

  const hasRole = useCallback(
    (roleSlug) => {
      if (!user || !user.role) return false;
      const currentRole = user.role.slug ? user.role.slug.toLowerCase() : '';
      if (Array.isArray(roleSlug)) {
        return roleSlug.map((r) => r.toLowerCase()).includes(currentRole);
      }
      return currentRole === roleSlug.toLowerCase();
    },
    [user]
  );

  const hasPermission = useCallback(
    (permissionCode) => {
      if (!user) return false;
      // Organization admin inherently possesses full permissions
      if (user.role && (user.role.slug === 'organization-admin' || user.role.slug === 'platform_admin')) {
        return true;
      }
      if (!user.permissions || !Array.isArray(user.permissions)) return false;
      return user.permissions.some((p) => p.code === permissionCode || p === permissionCode);
    },
    [user]
  );

  const clearSessionExpired = () => {
    setSessionExpired(false);
  };

  const value = {
    user,
    token,
    refreshToken,
    isAuthenticated: Boolean(token && user),
    isLoading,
    sessionExpired,
    clearSessionExpired,
    login,
    logout,
    setAuthSession,
    hasRole,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
