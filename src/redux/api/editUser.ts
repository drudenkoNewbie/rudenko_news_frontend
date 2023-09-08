import { User } from '../../types';
import { EditUserPayload } from '../types';

import api from './api';

export const editUser = async (payload: EditUserPayload): Promise<User> => {
  return api.put(`users/${payload.id}`, { ...payload.userData });
};
