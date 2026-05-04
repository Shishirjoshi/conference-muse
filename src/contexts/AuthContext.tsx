import { createContext, useState, useCallback, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const DEMO_CREDENTIALS = {
  email: 'admin@conference.com',
  password: 'admin123',
  token: 'demo-token',
  user: {
    id: 1,
    email: 'admin@conference.com',
    username: 'admin',
    fullName: 'Demo Admin',
    role: 'admin'
  }
};

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    setError(null);
  }, []);

  const verifyToken = useCallback(async (tokenToVerify) => {
    try {
      setIsLoading(true);

      if (tokenToVerify === DEMO_CREDENTIALS.token) {
        setUser(DEMO_CREDENTIALS.user);
        setToken(tokenToVerify);
        localStorage.setItem('authToken', tokenToVerify);
        setError(null);
        return true;
      }

      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${tokenToVerify}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(tokenToVerify);
        localStorage.setItem('authToken', tokenToVerify);
        setError(null);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (err) {
      console.error('Token verification failed:', err);
      logout();
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  // Verify token when token or verifyToken changes
  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, [token, verifyToken]);

  const login = useCallback(async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return false;
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('authToken', data.token);
      return true;
    } catch (err) {
      console.error('Login error:', err);

      if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        setUser(DEMO_CREDENTIALS.user);
        setToken(DEMO_CREDENTIALS.token);
        localStorage.setItem('authToken', DEMO_CREDENTIALS.token);
        setError(null);
        return true;
      }

      setError('Login failed. Please check your connection or credentials.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    token,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
