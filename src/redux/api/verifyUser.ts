import { AuthResponse } from '../../types';

import api from './api';

export const verifyUser = async (route: string, payload: string): Promise<AuthResponse> => {
  return api.post(`auth/${route}`, { token: payload });
};
