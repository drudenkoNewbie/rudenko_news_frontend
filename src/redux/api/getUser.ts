import { CompleteUser } from '../../types';

import api from './api';

export const getUser = async (id: number): Promise<CompleteUser[]> =>
  api.get(`users/${id}`);
