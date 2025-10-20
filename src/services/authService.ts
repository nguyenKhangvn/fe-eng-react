import api from './api';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types';
import { TOKEN_KEY } from '../utils/constants';

export const authService = {
  // Register new user
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  // Login user
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    if (response.data.access_token) {
      localStorage.setItem(TOKEN_KEY, response.data.access_token);
    }
    return response.data;
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Get stored token
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },
};
