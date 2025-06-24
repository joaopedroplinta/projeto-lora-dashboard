import { AuthResponse, LoRaData, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Endpoint: /register
 */
export const registerUser = async (credentials: { name: string, email: string, password_hash: string }): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Falha no registro');
  }

  return response.json();
};

/**
 * Endpoint: /login
 */
export const loginUser = async (credentials: { email: string, password_hash: string }): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Falha na autenticação');
  }

  return response.json();
};

/**
 * Endpoint: /getdata
 */
export const getLoRaData = async (token: string): Promise<LoRaData> => {
  const response = await fetch(`${API_BASE_URL}/getdata`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Falha ao buscar dados. Sua sessão pode ter expirado.');
  }

  return response.json();
};