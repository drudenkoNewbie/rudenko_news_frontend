import { AuthResponse, AuthUser } from '../../types';

import api from './api';

export const authUser = async (route: string, payload: AuthUser): Promise<AuthResponse> => {
  return api.post(`auth/${route}`, { ...payload });
};

export const verifyUser = async (token: string): Promise<AuthResponse> => {
  const headers = { 'Authorization': `Bearer ${token}` };
  return api.get('auth/whoami', { headers });
};
