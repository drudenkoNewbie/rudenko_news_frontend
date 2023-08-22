import { Post } from '../../types';

import api from './api';

export const getPosts = async ():Promise<Post[]> => api.get('posts');
