import { CompletePost } from '../../types';
import { AddPostPayload } from '../types';

import api from './api';

export const addPost = async (
  payload: AddPostPayload
): Promise<CompletePost> => {
  return api.post('posts', payload, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
