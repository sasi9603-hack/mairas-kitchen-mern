import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('mk_admin_token') || null);
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('mk_admin_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Verify stored session on mount
  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      const storedToken = localStorage.getItem('mk_admin_token');
      if (!storedToken) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const response = await api.getProfile(storedToken);
        if (isMounted && response.success && response.data) {
          setUser(response.data);
          localStorage.setItem('mk_admin_user', JSON.stringify(response.data));
        } else {
          // Token invalid or expired
          handleLogout();
        }
      } catch (err) {
        // If token verification fails (401 or invalid), clean up session
        if (err.status === 401) {
          handleLogout();
        } else {
          // If server is unreachable or timed out, check if we have a valid cached user
          const savedUser = localStorage.getItem('mk_admin_user');
          if (!savedUser) {
            handleLogout();
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    verifySession();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = async (email, password) => {
    const response = await api.login({ email, password });
    if (response.success && response.data) {
      const { token: newToken, ...userData } = response.data;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('mk_admin_token', newToken);
      localStorage.setItem('mk_admin_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    throw new Error(response.message || 'Login failed');
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('mk_admin_token');
    localStorage.removeItem('mk_admin_user');
  };

  const isAuthenticated = Boolean(token && user);
  const isAdmin = Boolean(user && (user.role === 'admin' || user.role === 'staff'));

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated,
        isAdmin,
        login: handleLogin,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
