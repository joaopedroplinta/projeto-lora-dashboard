import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AuthResponse } from '../types';
import * as api from '../api/service';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password_hash: string; }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('authToken'));
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userString = localStorage.getItem('user');
      if (token && userString) {
        setUser(JSON.parse(userString));
      }
    } catch (error) {
      console.error("Falha ao carregar dados do usuário:", error);
      localStorage.clear();
      setToken(null);
      setUser(null);
    }
  }, [token]);

  const login = async (credentials: { email: string; password_hash: string; }) => {
    const { token: apiToken, user: apiUser }: AuthResponse = await api.loginUser(credentials);
    setToken(apiToken);
    setUser(apiUser);
    localStorage.setItem('authToken', apiToken);
    localStorage.setItem('user', JSON.stringify(apiUser));
    navigate('/dashboard');
  };

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  }, [navigate]);

  const value = { user, token, isAuthenticated: !!token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};