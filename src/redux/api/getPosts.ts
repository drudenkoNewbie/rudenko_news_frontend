import { CompletePost } from '../../types';

import api from './api';

export const getPosts = async (): Promise<CompletePost[]> => api.get('posts');
