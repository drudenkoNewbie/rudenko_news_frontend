import { AuthResponse } from '../../types';

import api from './api';

export const verifyUser = async (payload: ): Promise<AuthResponse> => {
  const body = {};
  const headers = { 'Authorization': `Bearer ${token}` };
  return api.post('auth/whoami', body, { headers });
};
