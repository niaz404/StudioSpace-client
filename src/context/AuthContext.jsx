'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext();

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const storedToken = localStorage.getItem('studiospace_token');
        const storedUser = localStorage.getItem('studiospace_user');

        if (storedToken) {
          setToken(storedToken);
        }

        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {}
        }

        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : {},
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUser(data.user);
            localStorage.setItem('studiospace_user', JSON.stringify(data.user));
          }
        } else if (res.status === 401 && !storedUser) {
          setUser(null);
          setToken(null);
          localStorage.removeItem('studiospace_token');
          localStorage.removeItem('studiospace_user');
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Login failed.');
        return false;
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('studiospace_token', data.token);
      localStorage.setItem('studiospace_user', JSON.stringify(data.user));

      toast.success(`Welcome back, ${data.user.name}!`);
      return true;
    } catch (err) {
      toast.error('Could not connect to server.');
      return false;
    }
  };

  const register = async (name, email, password, photoURL) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, photoURL }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Registration failed.');
        return false;
      }

      toast.success('Registration successful! Please log in.');
      return true;
    } catch (err) {
      toast.error('Could not connect to server.');
      return false;
    }
  };

  const handleBackendGoogleAuth = async (name, email, photoURL) => {
    try {
      const res = await fetch(`${API_BASE}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, photoURL }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Google sign-in failed.');
        return false;
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('studiospace_token', data.token);
      localStorage.setItem('studiospace_user', JSON.stringify(data.user));

      toast.success(`Welcome, ${data.user.name}!`);
      return true;
    } catch (err) {
      toast.error('Could not connect to server.');
      return false;
    }
  };

  const googleLogin = async () => {
    if (typeof window !== 'undefined' && GOOGLE_CLIENT_ID && window.google?.accounts?.oauth2) {
      return new Promise((resolve) => {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
          callback: async (tokenResponse) => {
            if (tokenResponse?.access_token) {
              try {
                const infoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const info = await infoRes.json();
                const ok = await handleBackendGoogleAuth(
                  info.name || 'Google Creator',
                  info.email,
                  info.picture || ''
                );
                resolve(ok);
              } catch (e) {
                toast.error('Failed to retrieve Google profile.');
                resolve(false);
              }
            } else {
              resolve(false);
            }
          },
        });
        client.requestAccessToken();
      });
    }

    return await handleBackendGoogleAuth(
      'Google Creator',
      'google.creator@studiospace.io',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    );
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('studiospace_token');
      localStorage.removeItem('studiospace_user');
      toast.success('You have logged out.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        googleLogin,
        logout,
        isAuthenticated: !!user,
        isHost: user?.role === 'host',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
